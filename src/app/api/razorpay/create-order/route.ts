import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(req: NextRequest) {
  try {
    const { amount, currency = 'INR', receipt } = await req.json();

    const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // If real Razorpay keys are configured
    if (keyId && keySecret) {
      const razorpay = new Razorpay({
        key_id: keyId,
        key_secret: keySecret,
      });

      const options = {
        amount: Math.round(amount * 100), // Razorpay takes amount in paise (1 INR = 100 paise)
        currency,
        receipt: receipt || `receipt_${Date.now()}`,
      };

      const order = await razorpay.orders.create(options);
      return NextResponse.json({
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: keyId,
        isTestFallback: false
      });
    }

    // Fallback Mock Mode: Allows full end-to-end testing without breaking when keys are pending
    const mockOrderId = `order_test_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    return NextResponse.json({
      id: mockOrderId,
      amount: Math.round(amount * 100),
      currency: 'INR',
      keyId: 'rzp_test_placeholder_manlyaura',
      isTestFallback: true
    });
  } catch (error: any) {
    console.error('Razorpay order creation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create payment order' },
      { status: 500 }
    );
  }
}
