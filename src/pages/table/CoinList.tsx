import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import CoinChart from "../../components/molecules/coinChart.tsx";
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
    <div className="bg-gradient-to-b from-[#1b0a62] to-[#270f8a] shadow-lg rounded-xl overflow-hidden p-6 min-h-[92vh]">
      <table className="w-full text-white border-collapse">
        <thead>
          <tr className="text-gray-300 text-sm uppercase tracking-wider border-b border-gray-700">
            {[
              { label: "#", key: "market_cap_rank" },
              { label: "Coin", key: "name" },
              { label: "Price", key: "current_price" },
              { label: "1h", key: "price_change_percentage_1h_in_currency" },
              { label: "24h", key: "price_change_percentage_24h" },
              { label: "24h Price", key: "price_change_24h" },
              { label: "24h Volume", key: "total_volume" },
              { label: "Market Cap", key: "market_cap" },
              { label: "Chart", key: "sparkline_in_7d" },
            ].map(({ label, key }) => (
              <th
                key={key}
                className={`py-3 px-4 ${label === "Coin" ? "text-left" : "text-right"} cursor-pointer hover:bg-gray-700 transition-all duration-200`}
                onClick={() => handleSort(key)}
              >
                {label}
                {sortOptions.column === key && (
                  sortOptions.order === "asc"
                    ? (
                        <IoMdArrowDropup className="inline text-gray-400 ml-2" />
                      )
                    : (
                        <IoMdArrowDropdown className="inline text-gray-400 ml-2" />
                      )
                )}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {currentItems.map(coin => (
            <tr
              key={coin.id}
              onClick={() => navigate(`/coin/${coin.id}`)}
              className="cursor-pointer hover:bg-[#340f9b] text-center transition duration-700"
            >
              <td className="py-4 px-4 text-right">{coin.market_cap_rank}</td>
              <td className="py-4 px-4 text-left flex items-center space-x-2">
                <img src={coin.image} alt={coin.name} className="w-6 h-6 mr-2" />
                <span>{coin.name}</span>
              </td>
              <td className="py-4 px-4 text-right">
                $
                {coin.current_price.toLocaleString()}
              </td>
              <td className={`py-4 px-4 text-right ${coin.price_change_percentage_1h_in_currency > 0 ? "text-green-400" : "text-red-400"}`}>
                {coin.price_change_percentage_1h_in_currency?.toFixed(2)}
                %
              </td>
              <td className={`py-4 px-4 text-right ${coin.price_change_percentage_24h > 0 ? "text-green-400" : "text-red-400"}`}>
                {coin.price_change_percentage_24h?.toFixed(2)}
                %
              </td>
              <td className="py-4 px-4 text-right">
                $
                {coin.price_change_24h?.toFixed(2)}
              </td>
              <td className="py-4 px-4 text-right">
                $
                {coin.total_volume?.toLocaleString()}
              </td>
              <td className="py-4 px-4 text-right">
                $
                {coin.market_cap?.toLocaleString()}
              </td>
              <td className="py-4 px-4 text-right w-32 h-12">
                <CoinChart data={coin.sparkline_in_7d}>
                </CoinChart>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-white">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page
          {" "}
          {currentPage}
          {" "}
          of
          {" "}
          {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default CoinList;
