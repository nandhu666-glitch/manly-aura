import fs from 'fs';
import path from 'path';
import { Product, Order, OrderStatus, PaymentStatus } from '@/types';
import { INITIAL_PRODUCTS } from '@/data/initial-products';

const DATA_DIR = path.join(process.cwd(), 'data');
const STORE_FILE = path.join(DATA_DIR, 'store.json');

interface StoreData {
  products: Product[];
  orders: Order[];
}

function ensureDataFile(): StoreData {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(STORE_FILE)) {
      const initialData: StoreData = {
        products: INITIAL_PRODUCTS,
        orders: []
      };
      fs.writeFileSync(STORE_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
      return initialData;
    }
    const content = fs.readFileSync(STORE_FILE, 'utf-8');
    const parsed = JSON.parse(content) as StoreData;
    if (!parsed.products || parsed.products.length === 0) {
      parsed.products = INITIAL_PRODUCTS;
      fs.writeFileSync(STORE_FILE, JSON.stringify(parsed, null, 2), 'utf-8');
    }
    return parsed;
  } catch (error) {
    console.error('Error reading store file, falling back to initial data:', error);
    return {
      products: INITIAL_PRODUCTS,
      orders: []
    };
  }
}

function writeDataFile(data: StoreData) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(STORE_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing store file:', error);
  }
}

// --- PRODUCTS API ---
export async function getProducts(): Promise<Product[]> {
  const data = ensureDataFile();
  return data.products;
}

export async function getProductById(id: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find(p => p.id === id) || null;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find(p => p.slug === slug || p.id === slug) || null;
}

export async function createProduct(product: Omit<Product, 'id' | 'createdAt'>): Promise<Product> {
  const data = ensureDataFile();
  const newProduct: Product = {
    ...product,
    id: `prod-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString()
  };
  data.products.unshift(newProduct);
  writeDataFile(data);
  return newProduct;
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
  const data = ensureDataFile();
  const index = data.products.findIndex(p => p.id === id);
  if (index === -1) return null;

  data.products[index] = { ...data.products[index], ...updates };
  writeDataFile(data);
  return data.products[index];
}

export async function deleteProduct(id: string): Promise<boolean> {
  const data = ensureDataFile();
  const initialLength = data.products.length;
  data.products = data.products.filter(p => p.id !== id);
  if (data.products.length === initialLength) return false;

  writeDataFile(data);
  return true;
}

// --- ORDERS API ---
export async function getOrders(): Promise<Order[]> {
  const data = ensureDataFile();
  return data.orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getOrderById(id: string): Promise<Order | null> {
  const orders = await getOrders();
  return orders.find(o => o.id === id) || null;
}

export async function createOrder(orderData: Omit<Order, 'id' | 'createdAt'>): Promise<Order> {
  const data = ensureDataFile();
  const now = new Date();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const formattedDate = `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}`;
  const newOrder: Order = {
    ...orderData,
    id: `MA-${formattedDate}-${randomSuffix}`,
    createdAt: now.toISOString()
  };

  // Adjust stock for purchased items
  for (const item of newOrder.items) {
    const product = data.products.find(p => p.id === item.productId);
    if (product) {
      product.stock = Math.max(0, product.stock - item.quantity);
    }
  }

  data.orders.unshift(newOrder);
  writeDataFile(data);
  return newOrder;
}

export async function updateOrderStatus(id: string, status: OrderStatus, trackingNumber?: string): Promise<Order | null> {
  const data = ensureDataFile();
  const order = data.orders.find(o => o.id === id);
  if (!order) return null;

  order.orderStatus = status;
  if (trackingNumber !== undefined) {
    order.trackingNumber = trackingNumber;
  }
  writeDataFile(data);
  return order;
}

export async function updateOrderPayment(id: string, paymentStatus: PaymentStatus, razorpayPaymentId?: string): Promise<Order | null> {
  const data = ensureDataFile();
  const order = data.orders.find(o => o.id === id);
  if (!order) return null;

  order.paymentStatus = paymentStatus;
  if (razorpayPaymentId) {
    order.razorpayPaymentId = razorpayPaymentId;
  }
  if (paymentStatus === 'paid' && order.orderStatus === 'pending') {
    order.orderStatus = 'confirmed';
  }
  writeDataFile(data);
  return order;
}
