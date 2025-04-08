import { useQuery } from "@tanstack/react-query";

import type { CoinResponse, CoinSearchResponse, MarketChartData } from "../../lib/Types/types.ts";

const API_KEY = "CG-YvgLJyYaAipFfW9An6vRNwkG";
const MARKET_URL = "https://api.coingecko.com/api/v3/coins/markets";
const SEARCH_URL = "https://api.coingecko.com/api/v3/search";
const COIN_DETAIL_URL = "https://api.coingecko.com/api/v3/coins";

const defaultOptions = {
  method: "GET",
  headers: {
    "accept": "application/json",
    "x-cg-demo-api-key": API_KEY,
  },
};

export async function fetchCoins(): Promise<CoinResponse[]> {
  const params = new URLSearchParams({
    vs_currency: "usd",
    order: "market_cap_desc",
    per_page: "250",
    page: "1",
    sparkline: "true",
    price_change_percentage: "1h,24h,7d,30d",
  });

  const url = `${MARKET_URL}?${params}`;
  const response = await fetch(url, defaultOptions);
  if (!response.ok)
    throw new Error("Network response was not ok");
  return response.json();
}

export function useCoins() {
  return useQuery<CoinResponse[], Error>({
    queryKey: ["coins"],
    queryFn: fetchCoins,
  });
}

export async function searchCoins(query: string): Promise<CoinSearchResponse> {
  const url = `${SEARCH_URL}?query=${encodeURIComponent(query)}`;

  const response = await fetch(url, defaultOptions);
  if (!response.ok)
    throw new Error("Search request failed");
  return response.json();
}

export function useCoinSearch(query: string) {
  return useQuery<CoinSearchResponse, Error>({
    queryKey: ["coinSearch", query],
    queryFn: () => searchCoins(query),
    enabled: !!query,
  });
}

export async function fetchCoinDetails(id: string): Promise<any> {
  const url = `${COIN_DETAIL_URL}/${id}`;

  const response = await fetch(url, defaultOptions);
  if (!response.ok)
    throw new Error("Failed to fetch coin details");
  return response.json();
}

export function useCoinDetails(id: string) {
  return useQuery({
    queryKey: ["coinDetails", id],
    queryFn: () => fetchCoinDetails(id),
    enabled: !!id,
  });
}

export async function fetchMarketChart(
  id: string,
  currency = "usd",
  days = "7", // Default 7 days
): Promise<MarketChartData> {
  const params = new URLSearchParams({
    vs_currency: currency,
    days,
  });

  const url = `${COIN_DETAIL_URL}/${id}/market_chart?${params}`;

  const response = await fetch(url, defaultOptions);
  if (!response.ok)
    throw new Error("Failed to fetch market chart");
  return response.json();
}

export function useMarketChart(
  id: string,
  currency = "usd",
  days = "7",
) {
  return useQuery<MarketChartData, Error>({
    queryKey: ["marketChart", id, currency, days],
    queryFn: () => fetchMarketChart(id, currency, days),
    enabled: !!id,
  });
}

export type { CoinResponse, CoinSearchResponse, MarketChartData };
