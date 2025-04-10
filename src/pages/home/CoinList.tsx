// import { useQuery } from "@tanstack/react-query";
// import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
// import { useNavigate } from "react-router-dom";
//
// import type { UrlParams } from "../../Types/Types.ts";
//
// import CoinChart from "../../components/molecules/CoinChart.tsx";
// import Loader from "../../components/molecules/Loader.tsx";
// import { useSort } from "../../hooks/useSort";
// import { fetchCoins } from "../../services/products/Api.ts";
//
// function CoinList() {
//   const navigate = useNavigate();
//
//   const params: UrlParams = {
//     vs_currency: "usd",
//     order: "market_cap_desc",
//     per_page: "250",
//     page: "1",
//     sparkline: "true",
//     price_change_percentage: "1h,24h,7d,30d",
//   };
//
//   const { data = [], error, isLoading } = useQuery({
//     queryKey: ["coins", params],
//     queryFn: () => fetchCoins(params),
//   });
//
//   const { sortedData, handleSort, sortOptions } = useSort(data);
//
//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-[#1b0a62]">
//         <Loader />
//       </div>
//     );
//   }
//
//   if (error instanceof Error) {
//     return <div className="text-center text-red-500 text-lg mt-5">{error.message}</div>;
//   }
//
//   return (
//     <div
//       className="bg-gradient-to-b from-[#1b0a62] to-[#270f8a] shadow-lg rounded-xl overflow-hidden p-6 min-h-screen"
//     >
//       <table className="w-full text-white border-collapse">
//         <thead>
//           <tr className="text-gray-300 text-sm uppercase tracking-wider border-b border-gray-700">
//             {
//               [
//                 { label: "#", key: "market_cap_rank" },
//                 { label: "Coin", key: "name" },
//                 {
//                   label: "Price",
//                   key: "current_price",
//                 },
//                 { label: "1h", key: "price_change_percentage_1h_in_currency" },
//                 {
//                   label: "24h",
//                   key: "price_change_percentage_24h",
//                 },
//                 { label: "24h Price", key: "price_change_24h" },
//                 {
//                   label: "24h Volume",
//                   key: "total_volume",
//                 },
//                 { label: "Market Cap", key: "market_cap" },
//                 {
//                   label: "Last 7d Chart",
//                   key: "sparkline_in_7d",
//                 },
//               ].map(({ label, key }) => (
//                 <th
//                   key={key}
//                   className={`sticky py-3 px-4 ${label === "Coin" ? "text-left" : "text-right"} cursor-pointer hover:bg-gray-700 transition-all duration-200`}
//                   onClick={() => handleSort(key)}
//                 >
//                   <div className="flex gap-[0.5rem] items-center justify-center">
//                     <div className="w-full">{label}</div>
//                     {sortOptions.column === key && label !== "Last 7d Chart" && (
//                       sortOptions.order === "asc"
//                         ? <IoMdArrowDropup className="inline text-gray-400 ml-2 text-[2rem]" />
//                         : <IoMdArrowDropdown className="inline text-gray-400 ml-2 text-[2rem]" />
//                     )}
//                   </div>
//                 </th>
//               ))
//             }
//           </tr>
//         </thead>
//
//         <tbody>
//           {sortedData?.map(coin => (
//             <tr
//               key={coin.id}
//               onClick={() => navigate(`/coin/${coin.id}`)}
//               className="cursor-pointer hover:bg-[#340f9b] text-center transition duration-700"
//             >
//               <td className="py-4 px-4 text-right">{coin.market_cap_rank}</td>
//               <td className="py-4 px-4 text-left flex items-center space-x-2">
//                 <img src={coin.image} alt={coin.name} className="w-6 h-6 mr-2" />
//                 <span>{coin.name}</span>
//               </td>
//               <td className="py-4 px-4 text-right">
//                 {coin.current_price.toLocaleString()}
//               </td>
//               <td className={`py-4 px-4 text-right ${coin.price_change_percentage_1h_in_currency > 0 ? "text-green-400" : "text-red-400"}`}>
//                 {coin.price_change_percentage_1h_in_currency?.toFixed(3)}
//                 %
//               </td>
//               <td className={`py-4 px-4 text-right ${coin.price_change_percentage_24h > 0 ? "text-green-400" : "text-red-400"}`}>
//                 {coin.price_change_percentage_24h?.toFixed(2)}
//                 %
//               </td>
//               <td className={`py-4 px-4 text-right ${coin.price_change_24h > 0 ? "text-green-400" : "text-red-400"}`}>
//                 {coin.price_change_24h?.toFixed(2)}
//               </td>
//               <td className="py-4 px-4 text-right">
//                 {coin.total_volume?.toLocaleString()}
//               </td>
//               <td className="py-4 px-4 text-right">
//                 {coin.market_cap?.toLocaleString()}
//               </td>
//               <td className="py-4 px-4 w-32 h-12">
//                 <CoinChart data={coin.sparkline_in_7d} />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
//
// export default CoinList;

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import CoinChart from "../../components/molecules/CoinChart.tsx";
import Loader from "../../components/molecules/Loader.tsx";
import { useSort } from "../../hooks/useSort";
import { fetchCoins } from "../../services/products/Api.ts";

function CoinList() {
  const navigate = useNavigate();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const baseParams: {
    vs_currency: string;
    order: string;
    per_page: string;
    sparkline: string;
    price_change_percentage: string;
  } = {
    vs_currency: "usd",
    order: "market_cap_desc",
    per_page: "50",
    sparkline: "true",
    price_change_percentage: "1h,24h,7d,30d",
  };

  const { data, error, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["coins", baseParams],
    queryFn: ({ pageParam = 1 }) => fetchCoins({ ...baseParams, page: pageParam.toString() }),
    getNextPageParam: (lastPage, allPages) => (lastPage.length === 50 ? allPages.length + 1 : undefined),
    initialPageParam: 1,
  });

  const { sortedData, handleSort, sortOptions } = useSort(data?.pages.flat() || []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }, { threshold: 0.1 });

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

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
    <div className="bg-gradient-to-b from-[#1b0a62] to-[#270f8a] shadow-lg rounded-xl overflow-hidden p-6 min-h-screen">
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
              { label: "Last 7d Chart", key: "sparkline_in_7d" },
            ].map(({ label, key }) => (
              <th
                key={key}
                className={`sticky py-3 px-4 ${label === "Coin" ? "text-left" : "text-right"} cursor-pointer hover:bg-gray-700 transition-all duration-200`}
                onClick={() => handleSort(key)}
              >
                <div className="flex gap-[0.5rem] items-center justify-center">
                  <div className="w-full">{label}</div>
                  {sortOptions.column === key && label !== "Last 7d Chart" && (
                    sortOptions.order === "asc"
                      ? <IoMdArrowDropup className="inline text-gray-400 ml-2 text-[2rem]" />
                      : <IoMdArrowDropdown className="inline text-gray-400 ml-2 text-[2rem]" />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData?.map(coin => (
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
                {coin.current_price.toLocaleString()}
              </td>
              <td className={`py-4 px-4 text-right ${coin.price_change_percentage_1h_in_currency > 0 ? "text-green-400" : "text-red-400"}`}>
                {coin.price_change_percentage_1h_in_currency?.toFixed(3)}
                {" "}
                %
              </td>
              <td className={`py-4 px-4 text-right ${coin.price_change_percentage_24h > 0 ? "text-green-400" : "text-red-400"}`}>
                {coin.price_change_percentage_24h?.toFixed(2)}
                {" "}
                %
              </td>
              <td className={`py-4 px-4 text-right ${coin.price_change_24h > 0 ? "text-green-400" : "text-red-400"}`}>
                {coin.price_change_24h?.toFixed(2)}
              </td>
              <td className="py-4 px-4 text-right">{coin.total_volume?.toLocaleString()}</td>
              <td className="py-4 px-4 text-right">{coin.market_cap?.toLocaleString()}</td>
              <td className="py-4 px-4 w-32 h-12">
                <CoinChart data={coin.sparkline_in_7d} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isFetchingNextPage && (
        <div className="flex justify-center py-4">
          <Loader />
        </div>
      )}

      <div ref={loadMoreRef} className="h-10" />
    </div>
  );
}

export default CoinList;
