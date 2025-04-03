import { useEffect, useState } from "react";

type SortOrder = "asc" | "desc";

type SortOptions = {
  column: string;
  order: SortOrder;
};

export function useSort(initialData: any[]) {
  const [sortOptions, setSortOptions] = useState<SortOptions>({ column: "", order: "asc" });
  const [sortedData, setSortedData] = useState<any[]>([]);

  useEffect(() => {
    setSortedData(initialData);
  }, [initialData]);

  const handleSort = (column: string) => {
    let newOrder: SortOrder = "asc";

    if (sortOptions.column === column && sortOptions.order === "asc") {
      newOrder = "desc";
    }

    setSortOptions({ column, order: newOrder });

    const sorted = [...initialData].sort((a, b) => {
      if (column === "name") {
        return newOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      }
      else if (column === "rank") {
        return newOrder === "asc" ? a.rank - b.rank : b.rank - a.rank;
      }
      else if (column === "price") {
        return newOrder === "asc" ? a.current_price - b.current_price : b.current_price - a.current_price;
      }
      else if (column === "market_cap_change_percentage_24h") {
        return newOrder === "asc" ? a.market_cap_change_percentage_24h - b.market_cap_change_percentage_24h : b.market_cap_change_percentage_24h - a.market_cap_change_percentage_24h;
      }
      else if (column === "price_change_percentage_24h") {
        return newOrder === "asc" ? a.price_change_percentage_24h - b.price_change_percentage_24h : b.price_change_percentage_24h - a.price_change_percentage_24h;
      }
      else if (column === "price_change_24h") {
        return newOrder === "asc" ? a.price_change_24h - b.price_change_24h : b.price_change_24h - a.price_change_24h;
      }
      else if (column === "total_volume") {
        return newOrder === "asc" ? a.total_volume - b.total_volume : b.total_volume - a.total_volume;
      }
      else if (column === "market_cap") {
        return newOrder === "asc" ? a.market_cap - b.market_cap : b.market_cap - a.market_cap;
      }
      else if (column === "volume") {
        return newOrder === "asc" ? a.total_volume - b.total_volume : b.total_volume - a.total_volume;
      }
      else {
        return 0;
      }
    });

    setSortedData(sorted);
  };

  return { sortedData, handleSort, sortOptions };
}
