// app/api/create-payment/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";
import { randomUUID } from "crypto";

export async function POST(req) {
  const { amount, credits, userEmail, itemName } = await req.json();

  const orderId = randomUUID();

  const paymentData = {
    merchant_id: process.env.PAYFAST_MERCHANT_ID,
    merchant_key: process.env.PAYFAST_MERCHANT_KEY,
    return_url: `${process.env.NEXT_PUBLIC_URL}/payment-success`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/payment-cancel`,
    notify_url: `${process.env.NEXT_PUBLIC_URL}/api/webhook`,
    email_address: userEmail,
    m_payment_id: orderId,
    amount: amount.toFixed(2),
    item_name: itemName,
    custom_str1: userEmail,
    custom_int1: credits.toString(),
    email_confirmation: "1",
    confirmation_address: userEmail,
    signature: "",
  };

  const signature = generateSignature(
    paymentData,
    process.env.PAYFAST_SALT_PASSPHRASE
  );

  paymentData.signature = signature;

  const queryParams = new URLSearchParams();
  for (const [key, value] of Object.entries(paymentData)) {
    if (value !== undefined && value !== "") {
      queryParams.append(key, value);
    }
  }

  const basePaymentUrl =
    process.env.NODE_ENV === "production"
      ? "https://www.payfast.co.za/eng/process"
      : "https://sandbox.payfast.co.za/eng/process";

  const paymentUrl = `${basePaymentUrl}?${queryParams.toString()}`;

  return NextResponse.json({ url: paymentUrl });
}

// Helper function to generate the PayFast signature
function generateSignature(data, passPhrase) {
  const keys = [
    "merchant_id",
    "merchant_key",
    "return_url",
    "cancel_url",
    "notify_url",
    "name_first",
    "name_last",
    "email_address",
    "cell_number",
    "m_payment_id",
    "amount",
    "item_name",
    "item_description",
    "custom_int1",
    "custom_int2",
    "custom_int3",
    "custom_int4",
    "custom_int5",
    "custom_str1",
    "custom_str2",
    "custom_str3",
    "custom_str4",
    "custom_str5",
    "email_confirmation",
    "confirmation_address",
    "payment_method",
  ];

  let pfOutput = "";
  keys.forEach((key) => {
    if (data[key] !== undefined && data[key] !== "") {
      pfOutput += `${key}=${encodeURIComponent(data[key].trim()).replace(
        /%20/g,
        "+"
      )}&`;
    }
  });

  pfOutput = pfOutput.slice(0, -1);

  if (passPhrase !== null) {
    pfOutput += `&passphrase=${passPhrase}`;
  }

  return crypto.createHash("md5").update(pfOutput).digest("hex");
}
