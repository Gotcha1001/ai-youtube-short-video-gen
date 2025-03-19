// app/api/webhook/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";
import { ConvexHttpClient } from "convex/server";
import { api } from "@/convex/_generated/api";

function validateITNSignature(data, receivedSignature) {
  const { signature, ...dataWithoutSignature } = data;
  const notifyKeys = [
    "m_payment_id",
    "pf_payment_id",
    "payment_status",
    "item_name",
    "item_description",
    "amount_gross",
    "amount_fee",
    "amount_net",
    "custom_str1",
    "custom_str2",
    "custom_str3",
    "custom_str4",
    "custom_str5",
    "custom_int1",
    "custom_int2",
    "custom_int3",
    "custom_int4",
    "custom_int5",
    "name_first",
    "name_last",
    "email_address",
    "merchant_id",
  ];

  const pfParamString = notifyKeys
    .map((key) => {
      const value = dataWithoutSignature[key];
      return value !== undefined
        ? `${key}=${encodeURIComponent(String(value)).replace(/%20/g, "+")}`
        : null;
    })
    .filter(Boolean)
    .join("&");

  const passPhrase = process.env.PAYFAST_SALT_PASSPHRASE;
  const finalString = passPhrase
    ? `${pfParamString}&passphrase=${encodeURIComponent(passPhrase)}`
    : pfParamString;

  const calculatedSignature = crypto
    .createHash("md5")
    .update(finalString)
    .digest("hex");
  return calculatedSignature === receivedSignature;
}

export async function POST(req) {
  console.log("🔵 PayFast Webhook Triggered");

  try {
    const rawBodyStr = await req.text();
    console.log("📥 Raw webhook payload:", rawBodyStr);

    const pfData = Object.fromEntries(new URLSearchParams(rawBodyStr));
    console.log("🔍 Parsed PayFast data:", pfData);

    const isValidSignature = validateITNSignature(pfData, pfData.signature);
    console.log("✅ Signature validation result:", isValidSignature);

    if (!isValidSignature) {
      console.error("❌ Invalid signature received");
      return NextResponse.json({ error: "Invalid signature" });
    }

    console.log("💰 Payment status:", pfData.payment_status);

    if (pfData.payment_status !== "COMPLETE") {
      console.log(`⚠️ Payment not complete: ${pfData.payment_status}`);
      return NextResponse.json({ message: "Payment not complete" });
    }

    const userEmail = pfData.custom_str1;
    const creditsToAdd = parseInt(pfData.custom_int1);

    console.log("👤 Processing update for:", {
      userEmail,
      creditsToAdd,
      paymentId: pfData.pf_payment_id,
    });

    if (!userEmail || isNaN(creditsToAdd)) {
      console.error("❌ Invalid data received:", { userEmail, creditsToAdd });
      return NextResponse.json({ error: "Invalid data" });
    }

    // Initialize Convex client
    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

    // First, get the user by email
    const users = await convex.query(api.users.GetUserByEmail, {
      email: userEmail,
    });

    if (!users || users.length === 0) {
      console.error("❌ User not found in database:", userEmail);
      return NextResponse.json({ error: "User not found" });
    }

    const user = users[0];
    const currentCredits = user.credits ?? 0;
    const newCreditsAmount = currentCredits + creditsToAdd;

    console.log("📝 Updating user credits in database...");

    // Update user credits using the user ID
    const updateResult = await convex.mutation(api.users.UpdateUserCredits, {
      uid: user._id,
      credits: newCreditsAmount,
    });

    console.log("✅ Database update completed:", updateResult);

    return NextResponse.json({
      message: "Credits updated successfully",
      data: {
        userEmail,
        creditsAdded: creditsToAdd,
        newTotal: newCreditsAmount,
        paymentId: pfData.pf_payment_id,
      },
    });
  } catch (error) {
    console.error("❌ Error processing webhook:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
