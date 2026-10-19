import { NextRequest, NextResponse } from 'next/server';
import { getOrders, createOrder, getOrderById } from '@/lib/storage';
import { OrderCustomer, OrderItem, PaymentMethod } from '@/types';
import { INITIAL_PRODUCTS } from '@/data/initial-products';
import { getProducts } from '@/lib/storage';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get('id');
    const phone = searchParams.get('phone');

    const orders = await getOrders();

    if (orderId) {
      const match = orders.find((o) => o.id.toLowerCase() === orderId.toLowerCase());
      if (!match) {
        return NextResponse.json({ error: 'Order not found' }, { status: 404 });
      }
      return NextResponse.json(match);
    }

    if (phone) {
      const matches = orders.filter((o) => o.customer.phone.includes(phone.trim()));
      return NextResponse.json(matches);
    }

    return NextResponse.json(orders);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      customer,
      items,
      paymentMethod,
      razorpayOrderId,
      razorpayPaymentId
    }: {
      customer: OrderCustomer;
      items: { productId: string; quantity: number }[];
      paymentMethod: PaymentMethod;
      razorpayOrderId?: string;
      razorpayPaymentId?: string;
    } = body;

    if (!customer || !items || items.length === 0) {
      return NextResponse.json({ error: 'Missing customer information or items' }, { status: 400 });
    }

    // Fetch verified products from server to prevent client-side price tampering
    const allProducts = await getProducts();
    const verifiedOrderItems: OrderItem[] = [];

    const unitPrices: number[] = [];

    for (const item of items) {
      const prod = allProducts.find((p) => p.id === item.productId);
      if (!prod) {
        return NextResponse.json({ error: `Product not found: ${item.productId}` }, { status: 400 });
      }
      verifiedOrderItems.push({
        productId: prod.id,
        productName: prod.name,
        price: prod.price,
        quantity: item.quantity,
        image: prod.images[0]
      });

      for (let i = 0; i < item.quantity; i++) {
        unitPrices.push(prod.price);
      }
    }

    // Server-side calculation of Buy 3 Get 1 Free
    const totalItemUnits = unitPrices.length;
    unitPrices.sort((a, b) => a - b);
    const freeItemsCount = Math.floor(totalItemUnits / 4);

    let calculatedDiscount = 0;
    for (let i = 0; i < freeItemsCount; i++) {
      calculatedDiscount += unitPrices[i] || 0;
    }

    const calculatedSubtotal = verifiedOrderItems.reduce((acc, it) => acc + it.price * it.quantity, 0);
    const priceAfterDiscount = Math.max(0, calculatedSubtotal - calculatedDiscount);
    const calculatedShipping = priceAfterDiscount >= 999 || totalItemUnits === 0 ? 0 : 79;
    const calculatedTotal = priceAfterDiscount + calculatedShipping;

    const newOrder = await createOrder({
      customer,
      items: verifiedOrderItems,
      subtotal: calculatedSubtotal,
      discount: calculatedDiscount,
      shipping: calculatedShipping,
      total: calculatedTotal,
      paymentMethod,
      paymentStatus: paymentMethod === 'razorpay' ? 'paid' : 'cod_pending',
      orderStatus: paymentMethod === 'razorpay' ? 'confirmed' : 'pending',
      razorpayOrderId,
      razorpayPaymentId
    });

    return NextResponse.json({ success: true, order: newOrder });
  } catch (error: any) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
