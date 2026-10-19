import { NextRequest, NextResponse } from 'next/server';
import { updateOrderStatus, updateOrderPayment, getOrderById } from '@/lib/storage';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: PageProps) {
  try {
    const { id } = await params;
    const order = await getOrderById(id);
    if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    return NextResponse.json(order);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: PageProps) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { orderStatus, trackingNumber, paymentStatus } = body;

    let updatedOrder = null;

    if (orderStatus !== undefined) {
      updatedOrder = await updateOrderStatus(id, orderStatus, trackingNumber);
    }

    if (paymentStatus !== undefined) {
      updatedOrder = await updateOrderPayment(id, paymentStatus);
    }

    if (!updatedOrder) {
      return NextResponse.json({ error: 'Order not found or update failed' }, { status: 404 });
    }

    return NextResponse.json({ success: true, order: updatedOrder });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
