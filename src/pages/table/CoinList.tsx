import { useEffect, useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import type { CoinGeckoResponse } from "../../api/api.ts";

import { fetchCoins } from "../../api/api.ts";
import Loader from "../../components/common/loader.tsx";
import { useSort } from "../../hooks/useSort";

function CoinList() {
  const navigate = useNavigate();
  const [data, setData] = useState<CoinGeckoResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const loadCoins = async () => {
      try {
        setLoading(true);
        const response = await fetchCoins();
        const CoinData = response.map((coin: CoinGeckoResponse) => ({
          id: coin.id,
          rank: coin.market_cap_rank,
          name: coin.name,
          image: coin.image,
          current_price: coin.current_price || 0,
          market_cap_change_percentage_24h: coin.market_cap_change_percentage_24h || 0,
          price_change_percentage_24h: coin.price_change_percentage_24h || 0,
          price_change_24h: coin.price_change_24h || 0,
          total_volume: coin.total_volume || 0,
          market_cap: coin.market_cap || 0,
        }));
        setData(CoinData);
      }
      catch (e) {
        setError("Failed to fetch coins", e);
      }
      finally {
        setLoading(false);
      }
    };
    loadCoins();
  }, []);

  const { sortedData, handleSort, sortOptions } = useSort(data);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  if (loading)
    return <div className={`flex items-center justify-center w-full h-[84.5vh] `}><Loader /></div>;
  if (error) {
    return (
      <div className="text-center text-red-500 text-lg">
        Error:
        {error}
      </div>
    );
  }

  return (
    <div className="bg-[#1b0a62]  rounded-lg shadow-lg overflow-hidden">
      <table className="w-full text-white border-collapse overflow-hidden">
        <thead>
          <tr className="text-gray-300 text-sm uppercase tracking-wider border-b border-gray-700 hover:bg-gray-800 transition-all duration-200">

            <th
              className="py-3 px-4 text-left cursor-pointer hover:bg-gray-700 transition-all duration-200"
              onClick={() => handleSort("rank")}
            >
              #
              {sortOptions.column === "rank" && (
                sortOptions.order === "asc"
                  ? <IoMdArrowDropup className="inline text-gray-400 ml-2" />
                  : <IoMdArrowDropdown className="inline text-gray-400 ml-2" />
              )}
            </th>

            <th
              className="py-3 px-4 text-left cursor-pointer hover:bg-gray-700 transition-all duration-200"
              onClick={() => handleSort("name")}
            >
              Coin
              {sortOptions.column === "name" && (
                sortOptions.order === "asc"
                  ? <IoMdArrowDropup className="inline text-gray-400 ml-2" />
                  : <IoMdArrowDropdown className="inline text-gray-400 ml-2" />
              )}
            </th>

            <th
              className="py-3 px-4 text-center cursor-pointer flex items-center justify-center hover:bg-gray-700 transition-all duration-200"
              onClick={() => handleSort("price")}
            >
              Price
              {sortOptions.column === "price" && (
                sortOptions.order === "asc"
                  ? <IoMdArrowDropup className="inline text-gray-400 ml-2" />
                  : <IoMdArrowDropdown className="inline text-gray-400 ml-2" />
              )}
            </th>

            <th
              className="py-3 px-4 text-center hover:bg-gray-700"
              onClick={() => handleSort("market_cap_change_percentage_24h")}
            >
              1h
              {sortOptions.column === "market_cap_change_percentage_24h" && (
                sortOptions.order === "asc"
                  ? <IoMdArrowDropup className="inline text-gray-400 ml-2" />
                  : <IoMdArrowDropdown className="inline text-gray-400 ml-2" />
              )}
            </th>

            <th
              className="py-3 px-4 text-center hover:bg-gray-700"
              onClick={() => handleSort("price_change_percentage_24h")}
            >
              24h
              {sortOptions.column === "price_change_percentage_24h" && (
                sortOptions.order === "asc"
                  ? <IoMdArrowDropup className="inline text-gray-400 ml-2" />
                  : <IoMdArrowDropdown className="inline text-gray-400 ml-2" />
              )}
            </th>

            <th
              className="py-3 px-4 text-center"
              onClick={() => handleSort("price_change_24h")}
            >

              24h Price
              {sortOptions.column === "price_change_24h" && (
                sortOptions.order === "asc"
                  ? <IoMdArrowDropup className="inline text-gray-400 ml-2" />
                  : <IoMdArrowDropdown className="inline text-gray-400 ml-2" />
              )}
            </th>

            <th
              className="py-3 px-4 text-center"
              onClick={() => handleSort("total_volume")}
            >

              24h Volume

              {sortOptions.column === "total_volume" && (
                sortOptions.order === "asc"
                  ? <IoMdArrowDropup className="inline text-gray-400 ml-2" />
                  : <IoMdArrowDropdown className="inline text-gray-400 ml-2" />
              )}

            </th>

            <th
              className="py-3 px-4 text-center cursor-pointer flex items-center justify-center text-white hover:bg-gray-700 transition-all duration-200"
              onClick={() => handleSort("market_cap")}
            >
              Market Cap
              {sortOptions.column === "market_cap" && (
                sortOptions.order === "asc"
                  ? <IoMdArrowDropup className="inline text-gray-400 ml-2" />
                  : <IoMdArrowDropdown className="inline text-gray-400 ml-2" />
              )}
            </th>
          </tr>

        </thead>
        <tbody>
          {currentItems.map((coin: CoinGeckoResponse) => (
            <tr
              key={coin.id}
              onClick={() => navigate(`/coin/${coin.id}`)}
              className="cursor-pointer hover:bg-[#270f8a] text-center transition duration-200"
            >
              <td className="py-4 px-4 text-left">{coin.rank}</td>
              <td className="py-4 px-4 flex items-center gap-2">
                <img src={coin.image} alt={coin.name} className="h-6 w-6 rounded-full" />
                {coin.name}
              </td>
              <td className="py-4 px-4 text-right">
                $
                {coin.current_price.toLocaleString()}
              </td>
              <td className={`py-4 px-4 text-right ${coin.market_cap_change_percentage_24h >= 0 ? "text-green-400" : "text-red-400"}`}>
                {coin.market_cap_change_percentage_24h !== 0
                  ? (
                      <div className="flex items-center justify-end">
                        {coin.market_cap_change_percentage_24h < 0
                          ? <IoMdArrowDropdown />
                          : <IoMdArrowDropup />}
                        {Math.abs(coin.market_cap_change_percentage_24h).toFixed(2)}
                        %
                      </div>
                    )
                  : "--"}
              </td>
              <td className={`py-4 px-4 text-center ${coin.price_change_percentage_24h >= 0 ? "text-green-400" : "text-red-400"}`}>
                {coin.price_change_percentage_24h !== 0
                  ? (
                      <div className="flex items-center justify-end">
                        {coin.price_change_percentage_24h < 0 ? <IoMdArrowDropdown /> : <IoMdArrowDropup />}
                        {Math.abs(coin.price_change_percentage_24h).toFixed(2)}
                        %
                      </div>
                    )
                  : "--"}
              </td>
              <td className={`py-4 px-4 text-center ${coin.price_change_24h >= 0 ? "text-green-400" : "text-red-400"}`}>
                {coin.price_change_24h !== 0
                  ? (
                      <div className="flex items-center justify-end">
                        {coin.price_change_24h < 0 ? <IoMdArrowDropdown /> : <IoMdArrowDropup />}
                        $
                        {Math.abs(coin.price_change_24h).toFixed(2)}
                      </div>
                    )
                  : "--"}
              </td>
              <td className="py-4 px-4 text-center">
                $
                {coin.total_volume.toLocaleString()}
              </td>
              <td className="py-4 px-4 text-center">
                $
                {coin.market_cap.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => prev - 1)}
          className="px-4 py-2 bg-gray-700 text-white rounded-l disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2 bg-gray-800 text-white">
          Page
          {currentPage}
          {" "}
          of
          {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => prev + 1)}
          className="px-4 py-2 bg-gray-700 text-white rounded-r disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default CoinList;
