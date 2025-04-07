import { useParams } from "react-router-dom";

import { useCoinDetails } from "../../api/api.ts";
import Loader from "../../components/common/loader";

function CoinDetails() {
  const { id } = useParams();
  const { data, isLoading, error } = useCoinDetails(id || "");

  if (isLoading)
    return <div className="flex items-center justify-center h-screen bg-[#1b0a62]"><Loader /></div>;

  if (error)
    return <div className="text-center text-red-500 text-lg mt-5">Failed to load coin details</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1b0a62] to-[#270f8a] text-white p-6">
      <div className="max-w-3xl mx-auto bg-[#2a168d] rounded-xl shadow-xl p-6">
        <div className="flex items-center gap-4">
          <img src={data.image.large} alt={data.name} className="w-16 h-16" />
          <h1 className="text-3xl font-bold">
            {data.name}
            {" "}
            (
            {data.symbol.toUpperCase()}
            )
          </h1>
        </div>

        <p className="mt-4 text-lg text-gray-300">{data.description.en.split(". ")[0]}</p>

        <div className="mt-6 grid grid-cols-2 gap-6 text-sm">
          <div>
            <span className="text-gray-400">Current Price:</span>
            <p className="text-xl">
              $
              {data.market_data.current_price.usd.toLocaleString()}
            </p>
          </div>
          <div>
            <span className="text-gray-400">Market Cap:</span>
            <p className="text-xl">
              $
              {data.market_data.market_cap.usd.toLocaleString()}
            </p>
          </div>
          <div>
            <span className="text-gray-400">24h Change:</span>
            <p className={`${data.market_data.price_change_percentage_24h >= 0 ? "text-green-400" : "text-red-400"}`}>
              {data.market_data.price_change_percentage_24h.toFixed(2)}
              %
            </p>
          </div>
          <div>
            <span className="text-gray-400">Total Volume:</span>
            <p className="text-xl">
              $
              {data.market_data.total_volume.usd.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoinDetails;
