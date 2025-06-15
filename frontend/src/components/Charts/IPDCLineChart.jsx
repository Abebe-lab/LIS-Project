import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const IPDCLineChart = ({ data, xDataKeys="month",yDataKeys=["referred","responses"], showButton, PASSEDCOLORS = null }) => {
  const COLORS = ["magenta", "green"];
  return (
    <ResponsiveContainer width="100%" height={showButton ? 100 : 120}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xDataKeys} />
        <YAxis />
        <Tooltip />
        <Legend />
        {
          yDataKeys?.length &&
          yDataKeys.map((item, index) => (
            <Line
              type="monotone"
              dataKey={item}
              stroke={
                PASSEDCOLORS ? PASSEDCOLORS[index % 2] : COLORS[index % 2]
              }
              key={index}
            />
          ))}
      </LineChart>
    </ResponsiveContainer>
  );
};
export default IPDCLineChart;
