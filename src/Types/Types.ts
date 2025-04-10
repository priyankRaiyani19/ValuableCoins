export type CoinResponse = {
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

export type UrlParams = {
  vs_currency: string;
  order: string;
  per_page: string;
  page: string;
  sparkline: string;
  price_change_percentage: string;
};

export type CoinSearchResponse = {
  coins: {
    id: string;
    name: string;
    symbol: string;
    large: string;
  }[];
};

export type Coin = {
  id: string;
  rank: number;
  name: string;
  image: string;
  current_price: number;
  market_cap_change_percentage_24h: number;
  price_change_percentage_24h: number;
  price_change_24h: number;
  total_volume: number;
  market_cap: number;
};

export type MarketChartData = {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
};

export type MarketChartPoint = [
    timestamp: number,
    value: number,
];
