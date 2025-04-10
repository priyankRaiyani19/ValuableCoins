import _ from "lodash";
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

    const sorted = _.orderBy(initialData, [column], [newOrder]);

    setSortedData(sorted);
  };

  return { sortedData, handleSort, sortOptions };
}
