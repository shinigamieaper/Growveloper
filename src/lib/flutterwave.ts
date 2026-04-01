/* ============================================================
   Flutterwave — server-side checkout helper
   Docs: https://developer.flutterwave.com/docs/collecting-payments/standard
   ============================================================ */

export type FlutterwaveCurrency = "USD" | "GBP" | "NGN";

interface FlutterwaveChargePayload {
  tx_ref: string;
  amount: number;
  currency: FlutterwaveCurrency;
  redirect_url: string;
  customer: {
    email: string;
    name?: string;
  };
  customizations: {
    title: string;
    description?: string;
    logo?: string;
  };
  meta?: Record<string, string>;
}

interface FlutterwaveChargeResponse {
  status: "success" | "error";
  message: string;
  data?: {
    link: string;
  };
}

const FLW_API_URL = "https://api.flutterwave.com/v3/payments";

export async function createFlutterwaveCheckout(
  payload: FlutterwaveChargePayload
): Promise<{ url: string }> {
  const secretKey = process.env.FLW_SECRET_KEY;
  if (!secretKey) throw new Error("FLW_SECRET_KEY is not set");

  const res = await fetch(FLW_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${secretKey}`,
    },
    body: JSON.stringify(payload),
  });

  const json: FlutterwaveChargeResponse = await res.json();

  if (json.status !== "success" || !json.data?.link) {
    throw new Error(json.message ?? "Flutterwave checkout failed");
  }

  return { url: json.data.link };
}
