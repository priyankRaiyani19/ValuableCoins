import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import Loader from "../../components/molecules/loader";
import { useSort } from "../../lib/hooks/useSort";
import { fetchCoins } from "../../services/products/api";

function CoinList() {
  const navigate = useNavigate();
  const { data = [], error, isLoading } = useQuery({
    queryKey: ["coins"],
    queryFn: fetchCoins,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { sortedData, handleSort, sortOptions } = useSort(data);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#1b0a62]">
        <Loader />
      </div>
    );
  }

  if (error instanceof Error) {
    return <div className="text-center text-red-500 text-lg mt-5">{error.message}</div>;
  }

  return (
    <div className="bg-gradient-to-b from-[#1b0a62] to-[#270f8a] shadow-lg rounded-xl overflow-hidden p-6">
      <table className="w-full text-white border-collapse">
        <thead>
          <tr className="bg-[#270f8a] text-gray-300 text-sm uppercase tracking-wider border-b border-gray-700">
            {[
              { label: "#", key: "rank" },
              { label: "Coin", key: "name" },
              { label: "Price", key: "price" },
              { label: "1h", key: "market_cap_change_percentage_24h" },
              { label: "24h", key: "price_change_percentage_24h" },
              { label: "24h Price", key: "price_change_24h" },
              { label: "24h Volume", key: "total_volume" },
              { label: "Market Cap", key: "market_cap" },
            ].map(({ label, key }) => (
              <th
                key={key}
                className={`py-3 px-4 ${label === "Coin" ? "text-left" : "text-right"} cursor-pointer hover:bg-gray-700 transition-all duration-200`}
                onClick={() => handleSort(key)}
              >
                {label}
                {sortOptions.column === key
                  && (sortOptions.order === "asc"
                    ? (
                        <IoMdArrowDropup className="inline text-gray-400 ml-2" />
                      )
                    : (
                        <IoMdArrowDropdown className="inline text-gray-400 ml-2" />
                      ))}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentItems.map(coin => (
            <tr
              key={coin.id}
              onClick={() => navigate(`/coin/${coin.id}`)}
              className="cursor-pointer hover:bg-[#340f9b] hover:scale-102 text-center transition duration-700"
            >
              <td className="py-4 px-4 text-right">{coin.market_cap_rank}</td>
              <td className="py-4 px-4 flex items-center gap-2">
                <img src={coin.image} alt={coin.name} className="h-6 w-6 rounded-full" />
                {coin.name}
              </td>
              <td className="py-4 px-4 text-right">
                $
                {coin.current_price?.toLocaleString?.() || "N/A"}
              </td>
              <td className={`py-4 px-4 text-right ${coin.market_cap_change_percentage_24h >= 0 ? "text-green-400" : "text-red-400"}`}>
                {coin.market_cap_change_percentage_24h?.toFixed?.(2) || "0.00"}
                %
              </td>
              <td className={`py-4 px-4 text-right ${coin.price_change_percentage_24h >= 0 ? "text-green-400" : "text-red-400"}`}>
                {coin.price_change_percentage_24h?.toFixed?.(2) || "0.00"}
                %
              </td>
              <td className={`py-4 px-4 text-right ${coin.price_change_24h >= 0 ? "text-green-400" : "text-red-400"}`}>
                $
                {coin.price_change_24h?.toFixed?.(2) || "0.00"}
              </td>
              <td className="py-4 px-4 text-right">
                $
                {coin.total_volume?.toLocaleString?.() || "N/A"}
              </td>
              <td className="py-4 px-4 text-right">
                $
                {coin.market_cap?.toLocaleString?.() || "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => prev - 1)}
          className="px-4 py-2 bg-gray-700 text-white rounded-l disabled:opacity-50 hover:bg-gray-600"
        >
          Previous
        </button>
        <span className="px-4 py-2 bg-gray-800 text-white">
          Page
          {" "}
          {currentPage}
          {" "}
          of
          {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => prev + 1)}
          className="px-4 py-2 bg-gray-700 text-white rounded-r disabled:opacity-50 hover:bg-gray-600"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default CoinList;
