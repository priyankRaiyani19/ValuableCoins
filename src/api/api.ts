const API_KEY = "CG-YvgLJyYaAipFfW9An6vRNwkG";
const BASE_URL = "https://api.coingecko.com/api/v3/coins/markets";

const defaultOptions = {
  method: "GET",
  headers: {
    "accept": "application/json",
    "x-cg-demo-api-key": API_KEY,
  },
};

type CoinGeckoResponse = {
  id: string;
  rank: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  market_cap_change_percentage_24h: number;
  price_change_percentage_24h: number;
  price_change_24h: number;
};

export async function fetchCoins(): Promise<CoinGeckoResponse[]> {
  const params = new URLSearchParams({
    vs_currency: "usd",
    order: "market_cap_desc",
    sparkline: "false",
    priceChange: "1h,24h,7d",
  });

  const url = `${BASE_URL}?${params}`;

  try {
    const response = await fetch(url, defaultOptions);
    if (!response.ok)
      throw new Error("Network response was not ok");
    return response.json();
  }
  catch (error) {
    console.error("Error fetching coins:", error);
    throw error;
  }
}

export type { CoinGeckoResponse };
