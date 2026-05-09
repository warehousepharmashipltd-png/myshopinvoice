export enum Currency {
  BDT = '৳',
  USD = '$',
  EUR = '€',
  GBP = '£'
}

export interface InvoiceItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface ShopInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  logo?: string;
  vatId?: string;
  website?: string;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  address?: string;
}

export interface InvoiceData {
  invoiceNumber: string;
  date: string;
  shop: ShopInfo;
  customer: CustomerInfo;
  items: InvoiceItem[];
  currency: Currency;
  discount: number;
  taxRate: number;
  paymentMethod: string;
  footer?: string;
}
