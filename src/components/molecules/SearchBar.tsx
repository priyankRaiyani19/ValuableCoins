import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { useCoinSearch } from "../../services/products/api.ts";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const { data, isLoading, error } = useCoinSearch(query);
  const navigate = useNavigate();

  return (
    <div className="relative w-[280px]">
      <div className="flex items-center bg-white/10 border border-white/30 backdrop-blur-md rounded-full px-4 py-2 transition-all duration-300 focus-within:shadow-lg">
        <FaSearch className="text-white text-lg mr-2" />
        <input
          type="text"
          placeholder="Search coins..."
          className="bg-transparent text-white placeholder:text-gray-300 outline-none w-full text-sm"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowResults(true);
          }}
        />
      </div>

      {showResults && query && (
        <div className="absolute top-[110%] w-full bg-white text-black rounded-xl shadow-xl max-h-[300px] overflow-y-auto z-50 animate-fade-in border border-gray-200">
          {isLoading && (
            <div className="p-4 text-center text-gray-500">Loading...</div>
          )}
          {error && (
            <div className="p-4 text-center text-red-500">Error occurred</div>
          )}
          {data?.coins.length === 0 && !isLoading && (
            <div className="p-4 text-center text-gray-500">No results</div>
          )}
          {data?.coins.map(coin => (
            <div
              key={coin.id}
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors cursor-pointer text-sm"
              onClick={() => {
                navigate(`/coin/${coin.id}`);
                setQuery("");
                setShowResults(false);
              }}
            >
              <img
                src={coin.large}
                alt={coin.name}
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="font-medium">
                {coin.name}
                {" "}
                (
                {coin.symbol.toUpperCase()}
                )
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
