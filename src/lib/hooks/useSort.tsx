import { useMemo, useState } from "react";

type SortOrder = "asc" | "desc";

type SortOptions = {
  column: string;
  order: SortOrder;
};

export function useSort(initialData: any[]) {
  const [sortOptions, setSortOptions] = useState<SortOptions>({ column: "", order: "asc" });

  const sortedData = useMemo(() => {
    if (!sortOptions.column)
      return initialData;

    const sorted = [...initialData].sort((a, b) => {
      const { column, order } = sortOptions;
      const getValue = (item: any) => {
        switch (column) {
          case "name": return item.name;
          case "rank": return item.market_cap_rank;
          case "price": return item.current_price;
          case "market_cap_change_percentage_24h": return item.market_cap_change_percentage_24h;
          case "price_change_percentage_24h": return item.price_change_percentage_24h;
          case "price_change_24h": return item.price_change_24h;
          case "total_volume": return item.total_volume;
          case "market_cap": return item.market_cap;
          default: return 0;
        }
      };

      const aValue = getValue(a);
      const bValue = getValue(b);

      if (typeof aValue === "string" && typeof bValue === "string") {
        return order === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }

      return order === "asc" ? aValue - bValue : bValue - aValue;
    });

    return sorted;
  }, [initialData, sortOptions]);

  const handleSort = (column: string) => {
    const isSameColumn = sortOptions.column === column;
    const newOrder: SortOrder = isSameColumn && sortOptions.order === "asc" ? "desc" : "asc";
    setSortOptions({ column, order: newOrder });
  };

  return { sortedData, handleSort, sortOptions };
}
