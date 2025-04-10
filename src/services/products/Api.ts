import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import type { CoinResponse, CoinSearchResponse, MarketChartData, UrlParams } from "../../Types/Types.ts";

const API_KEY = "CG-YvgLJyYaAipFfW9An6vRNwkG";
const MARKET_URL = "https://api.coingecko.com/api/v3/coins/markets";
const SEARCH_URL = "https://api.coingecko.com/api/v3/search";
const COIN_DETAIL_URL = "https://api.coingecko.com/api/v3/coins";

const defaultOptions = {
  headers: {
    "accept": "application/json",
    "x-cg-demo-api-key": API_KEY,
  },
};

export async function fetchCoins(params: UrlParams): Promise<CoinResponse[]> {
  try {
    const response = await axios.get(MARKET_URL, { params, ...defaultOptions });
    // console.log(response);
    return response.data;
  }
  catch (error) {
    throw new Error(`Network response was not ok: ${error}`);
  }
}

export function useCoins(params: UrlParams) {
  return useQuery<CoinResponse[], Error>({
    queryKey: ["coins", params],
    queryFn: () => fetchCoins(params),
  });
}

export async function searchCoins(query: string): Promise<CoinSearchResponse> {
  try {
    const response = await axios.get(SEARCH_URL, {
      params: { query },
      ...defaultOptions,
    });
    return response.data;
  }
  catch (error) {
    throw new Error(`Search request failed: ${error}`);
  }
}

export function useCoinSearch(query: string) {
  return useQuery<CoinSearchResponse, Error>({
    queryKey: ["coinSearch", query],
    queryFn: () => searchCoins(query),
    enabled: !!query,
  });
}

export async function fetchCoinDetails(id: string): Promise<any> {
  try {
    const response = await axios.get(`${COIN_DETAIL_URL}/${id}`, defaultOptions);
    return response.data;
  }
  catch (error) {
    throw new Error(`Failed to fetch coin details: ${error}`);
  }
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
  days = "7",
): Promise<MarketChartData> {
  const params = {
    vs_currency: currency,
    days,
  };

  try {
    const response = await axios.get(`${COIN_DETAIL_URL}/${id}/market_chart`, {
      params,
      ...defaultOptions,
    });
    return response.data;
  }
  catch (error) {
    throw new Error(`Failed to fetch market chart: ${error}`);
  }
}

export function useMarketChart(id: string, currency = "usd", days = "7") {
  return useQuery<MarketChartData, Error>({
    queryKey: ["marketChart", id, currency, days],
    queryFn: () => fetchMarketChart(id, currency, days),
    enabled: !!id,
  });
}

export type { CoinResponse, CoinSearchResponse, MarketChartData };
