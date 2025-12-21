export async function getUserCurrency() {
  try {
    // Free IP geolocation API
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();

    const isIndia = data.country === "IN";

    if (isIndia) {
      return {
        country: "IN",
        currency: "INR",
        prices: {
          weekly: { amount: 249900 },
          monthly: { amount: 1499900 },
          yearly: { amount: 8999900 },
        },
      };
    }

    return {
      country: data.country,
      currency: "USD",
      prices: {
        weekly: { amount: 2900 },
        monthly: { amount: 12900 },
        yearly: { amount: 99900 },
      },
    };
  } catch (error) {
    // fallback
    return {
      country: "UNKNOWN",
      currency: "USD",
      prices: {
        weekly: { amount: 2900 },
        monthly: { amount: 12900 },
        yearly: { amount: 99900 },
      },
    };
  }
}
