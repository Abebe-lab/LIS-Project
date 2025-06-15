import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
const IPDCBarChart = ({ data,xDataKeys="Month", yDataKeys=["referred","sesponses"],showButton=false,PASSEDCOLORS=["#8884d8","#82ca9d","#ffc658","grey"] }) => {
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "grey"];
    return (
      <ResponsiveContainer width="100%" height={showButton ? 100 : 120}>
        <BarChart data={data} margin={0}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xDataKeys} />
          <YAxis />
          <Tooltip />
          <Legend />
          { yDataKeys?.length>0 &&
          yDataKeys.map((item, index) => (
            <Bar
              type="monotone"
              dataKey={item}
              stroke={
                PASSEDCOLORS ? PASSEDCOLORS[index % 2] : COLORS[index % 2]
              }
              key={index}
            />
          ))}
          {/*<Bar dataKey="export" stackId="a" fill="#8884d8" />
          <Bar dataKey="import" stackId="a" fill="#82ca9d" />
          <Bar dataKey="substitution" stackId="a" fill="#ffc658" />
          <Bar dataKey="employment" stackId="a" fill="#ffc658" />
          <Bar dataKey="linkage" stackId="a" fill="grey" />*/}
        </BarChart>
      </ResponsiveContainer>
    );
  };
  export default IPDCBarChart;