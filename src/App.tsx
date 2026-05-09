import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Trash2, 
  Printer, 
  Store, 
  User, 
  ShoppingBag, 
  Settings2,
  Trash,
  CheckCircle2,
  Download,
  ReceiptText
} from 'lucide-react';
import { InvoiceData, InvoiceItem, Currency } from './types';

export default function App() {
  const [data, setData] = useState<InvoiceData>({
    invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
    date: new Date().toISOString().split('T')[0],
    currency: Currency.BDT,
    shop: {
      name: 'My Store',
      address: '123 Dhaka Central, Bangladesh',
      phone: '+880-1234567890',
      email: 'hello@mystore.com',
    },
    customer: {
      name: 'Cash Customer',
      phone: '',
    },
    items: [
      { id: '1', name: 'Premium Rice', quantity: 2, price: 85 },
      { id: '2', name: 'Fresh Oil (1L)', quantity: 1, price: 165 },
    ],
    discount: 0,
    taxRate: 5,
    paymentMethod: 'Cash',
    footer: 'Thank you for shopping with us!',
  });

  const subtotal = data.items.reduce((acc, item) => acc + item.quantity * item.price, 0);
  const tax = (subtotal * data.taxRate) / 100;
  const total = subtotal + tax - data.discount;

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      quantity: 1,
      price: 0,
    };
    setData({ ...data, items: [...data.items, newItem] });
  };

  const removeItem = (id: string) => {
    setData({ ...data, items: data.items.filter(item => item.id !== id) });
  };

  const updateItem = (id: string, updates: Partial<InvoiceItem>) => {
    setData({
      ...data,
      items: data.items.map(item => item.id === id ? { ...item, ...updates } : item)
    });
  };

  const updateShop = (updates: Partial<typeof data.shop>) => {
    setData({ ...data, shop: { ...data.shop, ...updates } });
  };

  const updateCustomer = (updates: Partial<typeof data.customer>) => {
    setData({ ...data, customer: { ...data.customer, ...updates } });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden">
      {/* Configuration Side */}
      <div className="p-6 lg:p-12 overflow-y-auto max-h-screen no-print">
        <header className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
            <ReceiptText size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">ThermalEase</h1>
            <p className="text-slate-500 text-sm">Professional Receipt Maker</p>
          </div>
        </header>

        <section className="space-y-8">
          {/* Shop Settings */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 mb-4 text-indigo-600 font-medium">
              <Store size={18} />
              <h2>Shop Details</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Store Name</label>
                <input 
                  type="text" 
                  value={data.shop.name}
                  onChange={(e) => updateShop({ name: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Phone</label>
                <input 
                  type="text" 
                  value={data.shop.phone}
                  onChange={(e) => updateShop({ phone: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>
              <div className="md:col-span-2 space-y-1">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Address</label>
                <textarea 
                  rows={2}
                  value={data.shop.address}
                  onChange={(e) => updateShop({ address: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">VAT Reg / BIN</label>
                <input 
                  type="text" 
                  value={data.shop.vatId || ''}
                  onChange={(e) => updateShop({ vatId: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="e.g. 001234567-0101"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Website</label>
                <input 
                  type="text" 
                  value={data.shop.website || ''}
                  onChange={(e) => updateShop({ website: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="www.mystore.com"
                />
              </div>
            </div>
          </div>

          {/* Customer Settings */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 mb-4 text-indigo-600 font-medium">
              <User size={18} />
              <h2>Customer Info</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Customer Name</label>
                <input 
                  type="text" 
                  value={data.customer.name}
                  onChange={(e) => updateCustomer({ name: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Mobile</label>
                <input 
                  type="text" 
                  value={data.customer.phone}
                  onChange={(e) => updateCustomer({ phone: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Items Section */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-indigo-600 font-medium">
                <ShoppingBag size={18} />
                <h2>Items</h2>
              </div>
              <button 
                onClick={addItem}
                className="flex items-center gap-1 text-sm bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full font-medium hover:bg-indigo-100 transition-colors"
              >
                <Plus size={16} /> Add Item
              </button>
            </div>
            
            <div className="space-y-3">
              <AnimatePresence>
                {data.items.map((item, index) => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col md:flex-row gap-3 items-end md:items-center bg-slate-50/50 p-3 rounded-xl border border-slate-100"
                  >
                    <div className="flex-1 w-full space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Item Name</label>
                      <input 
                        type="text" 
                        value={item.name}
                        onChange={(e) => updateItem(item.id, { name: e.target.value })}
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="Item name..."
                      />
                    </div>
                    <div className="w-24 space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Qty</label>
                      <input 
                        type="number" 
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, { quantity: Number(e.target.value) })}
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                    </div>
                    <div className="w-32 space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Price</label>
                      <input 
                        type="number" 
                        value={item.price}
                        onChange={(e) => updateItem(item.id, { price: Number(e.target.value) })}
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Totals & Additional Info */}
          <div className="bg-indigo-900 rounded-2xl p-6 text-indigo-100">
            <div className="flex items-center gap-2 mb-6 text-indigo-300 font-medium">
              <Settings2 size={18} />
              <h2>Configuration</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-indigo-400">Currency</label>
                <select 
                  value={data.currency}
                  onChange={(e) => setData({ ...data, currency: e.target.value as Currency })}
                  className="w-full bg-indigo-800/50 border border-indigo-700 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  {Object.entries(Currency).map(([key, val]) => (
                    <option key={key} value={val}>{key} ({val})</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-indigo-400">Tax Rate (%)</label>
                <input 
                  type="number" 
                  value={data.taxRate}
                  onChange={(e) => setData({ ...data, taxRate: Number(e.target.value) })}
                  className="w-full bg-indigo-800/50 border border-indigo-700 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-indigo-400">Discount</label>
                <input 
                  type="number" 
                  value={data.discount}
                  onChange={(e) => setData({ ...data, discount: Number(e.target.value) })}
                  className="w-full bg-indigo-800/50 border border-indigo-700 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <div className="md:col-span-3 pt-4 border-t border-indigo-800 flex justify-between items-end">
                <div className="space-y-1">
                  <p className="text-sm text-indigo-300">Total Calculation</p>
                  <p className="text-3xl font-bold text-white">
                    {data.currency} {total.toLocaleString()}
                  </p>
                </div>
                <button 
                  onClick={handlePrint}
                  className="flex items-center gap-2 bg-white text-indigo-900 px-6 py-3 rounded-xl font-bold hover:bg-slate-100 transition-transform active:scale-95 shadow-lg shadow-indigo-950/20"
                >
                  <Printer size={20} /> Print Receipt
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Preview Side */}
      <div className="bg-slate-200/50 flex items-start justify-center overflow-y-auto p-4 lg:p-12 no-print min-h-screen">
        <ReceiptPreview data={data} total={total} subtotal={subtotal} tax={tax} />
      </div>

      {/* Hidden Print-only element */}
      <div className="hidden">
         <div id="thermal-receipt">
            <ReceiptPreview data={data} total={total} subtotal={subtotal} tax={tax} isPrinting />
         </div>
      </div>
    </div>
  );
}

function ReceiptPreview({ data, total, subtotal, tax, isPrinting = false }: { data: InvoiceData, total: number, subtotal: number, tax: number, isPrinting?: boolean }) {
  return (
    <div className={`
      bg-white shadow-xl flex flex-col font-mono text-[13px] leading-snug text-black uppercase
      ${isPrinting ? 'w-[80mm] p-4 shadow-none border-none' : 'w-[400px] min-h-[600px] p-8 border border-slate-200'}
    `}>
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold mb-1 leading-tight">{data.shop.name}</h2>
        <p className="text-xs mb-1 whitespace-pre-wrap">{data.shop.address}</p>
        <p className="text-xs mb-1">TEL: {data.shop.phone}</p>
        {data.shop.vatId && <p className="text-xs mb-1 uppercase text-[10px]">BIN/VAT: {data.shop.vatId}</p>}
        {data.shop.website && <p className="text-xs mb-1 italic text-[10px]">{data.shop.website}</p>}
        <p className="text-xs">{data.shop.email}</p>
      </div>

      <div className="flex justify-between border-t border-dashed border-black pt-4 mb-2">
        <span className="font-bold">INVOICE: #{data.invoiceNumber}</span>
        <span>{data.date}</span>
      </div>

      <div className="mb-4 text-xs">
        <p>CUSTOMER: {data.customer.name}</p>
        {data.customer.phone && <p>PHONE: {data.customer.phone}</p>}
      </div>

      <div className="border-y border-dashed border-black py-2 mb-4">
        <table className="w-full text-left">
          <thead>
            <tr className="font-bold border-b border-black">
              <th className="pb-1">ITEM</th>
              <th className="pb-1 text-center">QTY</th>
              <th className="pb-1 text-right">TOTAL</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dotted divide-gray-300">
            {data.items.map((item) => (
              <tr key={item.id} className="align-top">
                <td className="py-2 pr-2">
                  <div className="font-bold">{item.name || 'Untitled Item'}</div>
                  <div className="text-[10px] opacity-70">
                    {item.quantity} x {data.currency}{item.price.toLocaleString()}
                  </div>
                </td>
                <td className="py-2 text-center">{item.quantity}</td>
                <td className="py-2 text-right">{(item.quantity * item.price).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-1 mb-6 text-sm">
        <div className="flex justify-between">
          <span>SUB TOTAL:</span>
          <span>{data.currency} {subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>TAX ({data.taxRate}%):</span>
          <span>{data.currency} {tax.toLocaleString()}</span>
        </div>
        {data.discount > 0 && (
          <div className="flex justify-between text-indigo-700">
            <span>DISCOUNT:</span>
            <span>- {data.currency} {data.discount.toLocaleString()}</span>
          </div>
        )}
        <div className="flex justify-between text-lg font-bold border-t border-black pt-2 mt-2">
          <span>TOTAL:</span>
          <span>{data.currency} {total.toLocaleString()}</span>
        </div>
      </div>

      <div className="mb-8">
        <p className="mb-1 uppercase">PAYMENT: {data.paymentMethod}</p>
        <p className="text-[10px] opacity-60">TRANS ID: {Math.random().toString(36).substr(2, 12).toUpperCase()}</p>
      </div>

      <div className="mt-auto text-center">
        <div className="flex justify-center mb-2">
          <div className="w-12 h-12 border-2 border-black flex items-center justify-center font-bold text-2xl">
            OK
          </div>
        </div>
        <p className="text-xs mb-4 italic whitespace-pre-wrap">{data.footer}</p>
        <div className="flex flex-col items-center gap-1 opacity-50 text-[10px]">
          <p>----------------------------</p>
          <p>POWERED BY THERMALEASE</p>
          <p>{new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
