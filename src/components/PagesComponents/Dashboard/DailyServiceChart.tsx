import { LineChart, Line, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

type TProps = {
    data: {
        _id: string;
        total: number;
    }[]
}

const DailyServiceChart = ({ data } : TProps) => {
  return (
    <div className="bg-white px-5 py-4 rounded-lg">
      <h2 className="mb-4 text-2xl font-semibold text-primaryColor">Daily Service</h2>
      <div className="w-full">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="1 1" />
            {/* Use _id as X axis */}
            <XAxis tickLine={false} dataKey="_id" />
            <YAxis tickLine={false} />
            <Tooltip />
            {/* Use total as the value for the line */}
            <Line dataKey="total" stroke="#380538" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DailyServiceChart;
