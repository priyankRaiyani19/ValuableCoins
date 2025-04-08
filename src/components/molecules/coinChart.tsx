import React from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

type MiniChartProps = {
  data: number[]; // Expecting array of numbers
};

const CoinChart: React.FC<MiniChartProps> = ({ data }) => {
  // Safely prepare data
  const chartData = Array.isArray(data)
    ? data.map((price, index) => ({
        index,
        price,
      }))
    : [];

  return (
    <div style={{ width: "100px", height: "40px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line
            type="monotone"
            dataKey="price"
            stroke="#4bc0c0"
            strokeWidth={1.5}
            dot={false}
          />
          <Tooltip
            contentStyle={{ display: "none" }} // Hide tooltip box
            cursor={{ stroke: "#4bc0c0", strokeWidth: 1 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CoinChart;
