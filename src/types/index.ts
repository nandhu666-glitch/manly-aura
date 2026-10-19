export type CategorySlug = 'fragrance' | 'accessories' | 'gadgets' | 'fashion';

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: CategorySlug;
  price: number;
  compareAtPrice?: number;
  description: string;
  details: string[];
  features?: string[];
  images: string[];
  stock: number;
  featured?: boolean;
  isNew?: boolean;
  rating: number;
  reviewCount: number;
  badge?: string;
  sku: string;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderCustomer {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  notes?: string;
}

export type PaymentMethod = 'razorpay' | 'cod';
export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'cod_pending';

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  image: string;
  isFree?: boolean; // For Buy 3 Get 1 Free promo
}

export interface Order {
  id: string;
  customer: OrderCustomer;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  createdAt: string;
  trackingNumber?: string;
}
