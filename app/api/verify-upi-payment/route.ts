import { NextResponse } from "next/server";
import { auth } from "@/auth";
import Order from "@/lib/db/models/order.model";
import { connectToDatabase } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { orderId, transactionId, email, amount, paymentMethod } = body;

    // Find the order
    const order = await Order.findById(orderId);
    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    if (paymentMethod == "COD Advance") {
      if (order.shippingPrice !== amount / 100) {
        return NextResponse.json(
          { success: false, message: "Amount mismatch" },
          { status: 400 }
        );
      }
      order.isPaid = false;
    } else {
      // Verify the amount matches
      if (order.totalPrice !== amount / 100) {
        return NextResponse.json(
          { success: false, message: "Amount mismatch" },
          { status: 400 }
        );
      }
      order.isPaid = true;
    }
    // Update the order with payment details

    order.paidAt = new Date();
    order.paymentResult = {
      id: transactionId,
      status: "COMPLETED",
      email_address: email,
      pricePaid: amount.toString(),
      // transactionId: transactionId,
    };

    await order.save();

    // Revalidate cache if needed
    revalidatePath(`/account/orders/${orderId}`);

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (error) {
    console.error("Error verifying UPI payment:", error);
    return NextResponse.json(
      { success: false, message: "Error verifying payment" },
      { status: 500 }
    );
  }
}
