import { ArrowLeftFromLine } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import Loader from "../../components/molecules/Loader.tsx";
import { useCoinDetails, useMarketChart } from "../../services/products/Api.ts";

function CoinDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState("7");

  const { data, isLoading, error } = useCoinDetails(id || "");
  const { data: chartData, isLoading: chartLoading } = useMarketChart(id || "", "usd", timeRange);

  if (isLoading || chartLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br">
        <Loader />
      </div>
    );
  }

  if (error || !data) {
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

  const formatChartData = () => {
    if (!chartData || !chartData.prices || chartData.prices.length === 0) {
      return [];
    }

    const rawData = chartData.prices.map(([timestamp, price]) => ({
      timestamp,
      price: Number(price.toFixed(2)),
      fullDate: new Date(timestamp),
    }));

    let interval;
    switch (timeRange) {
      case "365":
        interval = Math.floor(rawData.length / 12);
        break;
      case "90":
        interval = Math.floor(rawData.length / 12);
        break;
      case "30":
        interval = Math.floor(rawData.length / 10);
        break;
      default:
        interval = Math.floor(rawData.length / 7);
    }

    interval = Math.max(interval, 1);

    const filteredData = rawData.filter((_, index) => index % interval === 0);

    return filteredData.map((point) => {
      let formattedDate;
      if (timeRange === "7") {
        formattedDate = point.fullDate.toLocaleDateString("en-US", { weekday: "short" });
      }
      else if (timeRange === "30") {
        formattedDate = `${point.fullDate.getDate()} ${point.fullDate.toLocaleDateString("en-US", { month: "short" })}`;
      }
      else {
        formattedDate = point.fullDate.toLocaleDateString("en-US", { month: "short" });
      }

      return {
        time: formattedDate,
        price: point.price,
        timestamp: point.timestamp,
      };
    });
  };

  const displayData = formatChartData();

  const timeRanges = [
    { label: "7D", value: "7" },
    { label: "30D", value: "30" },
    { label: "90D", value: "90" },
    { label: "1Y", value: "365" },
  ];

  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1b0a62] to-[#270f8a] text-white p-8">
      <div className="max-w-5xl mx-auto bg-[#2a168d] bg-opacity-90 rounded-3xl shadow-2xl p-10 space-y-10 backdrop-blur-md transition-all duration-300 hover:shadow-purple-700">

        <button
          onClick={() => navigate("/")}
          className="text-white hover:text-white transition-colors flex items-center justify-center gap-2 p-2 rounded-full bg-purple-700/80 hover:bg-purple-600 border-2 border-amber-200"
        >
          <ArrowLeftFromLine />
          {" "}
          Back to Coins
        </button>

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
              {data.description.en
                ? data.description.en.split(". ")[0].replace(/<[^>]+(>|$)/g, "")
                : "No description available."}
            </p>

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

        <div>
          <h3 className="text-purple-300 font-semibold text-lg mb-4">Price Overview</h3>

          <div className="flex gap-4 mb-4">
            {timeRanges.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => handleTimeRangeChange(value)}
                className={`px-4 py-1 rounded-full transition-all border ${
                  timeRange === value
                    ? "bg-purple-700 text-white border-purple-400"
                    : "bg-purple-900 text-gray-300 border-purple-600 hover:bg-purple-800"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="w-full h-64 bg-opacity-50 rounded-xl p-4">
            {chartLoading
              ? (
                  <div className="flex justify-center items-center h-full">
                    <Loader />
                  </div>
                )
              : (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={displayData}>
                      <defs>
                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="time"
                        stroke="#ccc"
                        axisLine={{ stroke: "#606060" }}
                        tickLine={{ stroke: "#606060" }}
                        interval="preserveStartEnd"
                      />
                      <YAxis
                        stroke="#ccc"
                        domain={["auto", "auto"]}
                        tickFormatter={tick => `$${tick.toLocaleString()}`}
                        axisLine={{ stroke: "#606060" }}
                        tickLine={{ stroke: "#606060" }}
                      />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#2a168d", border: "none" }}
                        formatter={(value: number) => [`$${value.toLocaleString()}`, "Price"]}
                        labelFormatter={label => `Date: ${label}`}
                      />
                      <Area
                        type="monotone"
                        dataKey="price"
                        stroke="#a855f7"
                        fillOpacity={1}
                        fill="url(#colorPrice)"
                        animationDuration={500}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-purple-800 bg-opacity-60 rounded-xl">
          <div>
            <h3 className="text-lg font-semibold text-purple-300">Current Price</h3>
            <p className="text-3xl font-bold">
              $
              {formatNumber(marketData.current_price.usd)}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-purple-300">
              Price Change (
              {timeRange === "7" ? "7D" : timeRange === "30" ? "30D" : timeRange === "90" ? "90D" : "1Y"}
              )
            </h3>
            <p className={`text-2xl font-bold ${priceChangeClass(
              timeRange === "7"
                ? marketData.price_change_percentage_7d_in_currency?.usd || 0
                : timeRange === "30"
                  ? marketData.price_change_percentage_30d_in_currency?.usd || 0
                  : timeRange === "90"
                    ? marketData.price_change_percentage_60d_in_currency?.usd || 0
                    : marketData.price_change_percentage_1y_in_currency?.usd || 0,
            )}`}
            >
              {(timeRange === "7"
                ? marketData.price_change_percentage_7d_in_currency?.usd
                : timeRange === "30"
                  ? marketData.price_change_percentage_30d_in_currency?.usd
                  : timeRange === "90"
                    ? marketData.price_change_percentage_60d_in_currency?.usd
                    : marketData.price_change_percentage_1y_in_currency?.usd)?.toFixed(2)}
              %
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {[
            { label: "Market Cap", value: `$${formatNumber(marketData.market_cap.usd)}` },
            { label: "24h Volume", value: `$${formatNumber(marketData.total_volume.usd)}` },
            { label: "Fully Diluted Valuation (FDV)", value: `$${formatNumber(marketData.fully_diluted_valuation?.usd)}` },
            { label: "High 24h", value: `$${formatNumber(marketData.high_24h.usd)}` },
            { label: "Price Change 24h", value: `${marketData.price_change_percentage_24h?.toFixed(2)}%`, className: priceChangeClass(marketData.price_change_24h) },
            { label: "Low 24h", value: `$${formatNumber(marketData.low_24h.usd)}` },
            { label: "Circulating Supply", value: formatNumber(marketData.circulating_supply) },
            { label: "Total Supply", value: formatNumber(marketData.total_supply) },
            { label: "Max Supply", value: formatNumber(marketData.max_supply) },
          ].map(({ label, value, className }) => (
            <div key={label} className="bg-purple-800 bg-opacity-60 rounded-xl p-4 shadow-lg">
              <h3 className="text-lg font-semibold text-purple-300">{label}</h3>
              <p className={`text-xl mt-2 ${className}`}>{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CoinDetails;
