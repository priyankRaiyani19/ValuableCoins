import { Area, AreaChart, ResponsiveContainer } from "recharts";

type SparklineData = {
  price: number[];
} | number[];

function CoinChart({ data }: { data: SparklineData }) {
  const prices = Array.isArray(data) ? data : data?.price || [];

  const chartData = prices.map((price, index) => ({
    time: index,
    price,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData}>
        <Area
          type="monotone"
          dataKey="price"
          stroke="#FF4C4C"
          fill="#FF4C4C"
          fillOpacity={0.2}
          dot={false}
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default CoinChart;
