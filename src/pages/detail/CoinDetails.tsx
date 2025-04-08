import { ArrowLeftFromLine } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import Loader from "../../components/molecules/loader.tsx";
import { useCoinDetails } from "../../services/products/api.ts";

function CoinDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useCoinDetails(id || "");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br ">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-800 to-indigo-900">
        <p className="text-center text-red-400 text-lg">
          Failed to load coin details
        </p>
      </div>
    );
  }

  const marketData = data.market_data;

  const priceChangeClass = (value: number) =>
    value >= 0 ? "text-green-400" : "text-red-400";

  const formatNumber = (number: number | null | undefined) =>
    number ? number.toLocaleString() : "N/A";

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1b0a62] to-[#270f8a] text-white p-8">
      <div className="max-w-5xl mx-auto bg-[#2a168d] bg-opacity-90 rounded-3xl shadow-2xl p-10 space-y-10 backdrop-blur-md transition-all duration-300 hover:shadow-purple-700">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="text-white hover:text-white transition-colors flex items-center justify-center gap-2 p-2 rounded-full bg-purple-700/80 hover:bg-purple-600 border-2 border-amber-200 "
        >
          <ArrowLeftFromLine />
          {" "}
          Back to Coins
        </button>

        {/* Header */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={data.image.large}
            alt={data.name}
            className="w-24 h-24 rounded-full shadow-lg border-4 border-purple-500 hover:scale-105 transition-transform duration-300"
          />
          <div>
            <h1 className="text-4xl font-extrabold tracking-wide">
              {data.name}
              {" "}
              <span className="text-purple-300">
                (
                {data.symbol.toUpperCase()}
                )
              </span>
            </h1>
            <p className="mt-2 text-gray-300 text-sm leading-relaxed">
              {data.description.en.split(". ")[0] || "No description available."}
            </p>

            {/* Links */}
            <div className="mt-3 flex flex-wrap gap-4 text-sm">
              {data.links.homepage[0] && (
                <a
                  href={data.links.homepage[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-purple-700 hover:bg-purple-800 px-3 py-1 rounded-full transition-all"
                >
                  🌐 Official Website
                </a>
              )}
              {data.links.blockchain_site[0] && (
                <a
                  href={data.links.blockchain_site[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-purple-700 hover:bg-purple-800 px-3 py-1 rounded-full transition-all"
                >
                  🔗 Blockchain Info
                </a>
              )}
              {data.links.subreddit_url && (
                <a
                  href={data.links.subreddit_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-purple-700 hover:bg-purple-800 px-3 py-1 rounded-full transition-all"
                >
                  👾 Reddit Community
                </a>
              )}
              {data.links.twitter_screen_name && (
                <a
                  href={`https://twitter.com/${data.links.twitter_screen_name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-purple-700 hover:bg-purple-800 px-3 py-1 rounded-full transition-all"
                >
                  🐦 Twitter
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Coin Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {/* Current Price */}
          <div className="bg-purple-800 bg-opacity-60 rounded-xl p-4 shadow-lg">
            <h3 className="text-lg font-semibold text-purple-300">Current Price</h3>
            <p className="text-xl mt-2">
              $
              {formatNumber(marketData.current_price.usd)}
            </p>
          </div>

          {/* Market Cap */}
          <div className="bg-purple-800 bg-opacity-60 rounded-xl p-4 shadow-lg">
            <h3 className="text-lg font-semibold text-purple-300">Market Cap</h3>
            <p className="text-xl mt-2">
              $
              {formatNumber(marketData.market_cap.usd)}
            </p>
          </div>

          {/* 24h Volume */}
          <div className="bg-purple-800 bg-opacity-60 rounded-xl p-4 shadow-lg">
            <h3 className="text-lg font-semibold text-purple-300">24h Volume</h3>
            <p className="text-xl mt-2">
              $
              {formatNumber(marketData.total_volume.usd)}
            </p>
          </div>

          {/* FDV */}
          <div className="bg-purple-800 bg-opacity-60 rounded-xl p-4 shadow-lg">
            <h3 className="text-lg font-semibold text-purple-300">Fully Diluted Valuation (FDV)</h3>
            <p className="text-xl mt-2">
              $
              {formatNumber(marketData.fully_diluted_valuation?.usd)}
            </p>
          </div>

          {/* High 24h */}
          <div className="bg-purple-800 bg-opacity-60 rounded-xl p-4 shadow-lg">
            <h3 className="text-lg font-semibold text-purple-300">High 24h</h3>
            <p className="text-xl mt-2">
              $
              {formatNumber(marketData.high_24h.usd)}
            </p>
          </div>

          {/* Price Change 24h */}
          <div className="bg-purple-800 bg-opacity-60 rounded-xl p-4 shadow-lg">
            <h3 className="text-lg font-semibold text-purple-300">Price Change 24h</h3>
            <p className={`text-xl mt-2 ${priceChangeClass(marketData.price_change_24h)}`}>
              {marketData.price_change_percentage_24h?.toFixed(2)}
              %
            </p>
          </div>

          {/* Low 24h */}
          <div className="bg-purple-800 bg-opacity-60 rounded-xl p-4 shadow-lg">
            <h3 className="text-lg font-semibold text-purple-300">Low 24h</h3>
            <p className="text-xl mt-2">
              $
              {formatNumber(marketData.low_24h.usd)}
            </p>
          </div>

          {/* Circulating Supply */}
          <div className="bg-purple-800 bg-opacity-60 rounded-xl p-4 shadow-lg">
            <h3 className="text-lg font-semibold text-purple-300">Circulating Supply</h3>
            <p className="text-xl mt-2">{formatNumber(marketData.circulating_supply)}</p>
          </div>

          {/* Total Supply */}
          <div className="bg-purple-800 bg-opacity-60 rounded-xl p-4 shadow-lg">
            <h3 className="text-lg font-semibold text-purple-300">Total Supply</h3>
            <p className="text-xl mt-2">{formatNumber(marketData.total_supply)}</p>
          </div>

          {/* Max Supply */}
          <div className="bg-purple-800 bg-opacity-60 rounded-xl p-4 shadow-lg">
            <h3 className="text-lg font-semibold text-purple-300">Max Supply</h3>
            <p className="text-xl mt-2">{formatNumber(marketData.max_supply)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoinDetails;
