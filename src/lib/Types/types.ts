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
