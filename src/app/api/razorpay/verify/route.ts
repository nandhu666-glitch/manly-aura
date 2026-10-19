import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = await req.json();

    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keySecret) {
      // In development/test mode without credentials, allow simulated success
      return NextResponse.json({
        success: true,
        message: 'Test mode verification accepted'
      });
    }

    const generatedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest('hex');

    if (generatedSignature === razorpaySignature) {
      return NextResponse.json({
        success: true,
        message: 'Payment signature verified successfully'
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid payment signature' },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('Razorpay verification error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Signature verification failed' },
      { status: 500 }
    );
  }
}
