import useUserStore from "@/stores/userStore";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const MonthlyBarChart = () => {
  const movements = useUserStore((state) => state.movements);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!movements || movements.length === 0) return;

    const monthlyData = {};

    movements.forEach(({ amount, type, date }) => {
      const monthKey = new Date(date).toISOString().slice(0, 7);

      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { month: monthKey, income: 0, expense: 0 };
      }

      if (type === "income") {
        monthlyData[monthKey].income += Number(amount);
      } else if (type === "expense") {
        monthlyData[monthKey].expense += Number(amount);
      }
    });

    const formattedData = Object.values(monthlyData);
    console.log(formattedData);
    setData(formattedData);
  }, [movements]);

  console.log("Current Data in State:", data);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="income"
          fill="#82ca9d"
          activeBar={<Rectangle fill="pink" stroke="blue" />}
        />
        <Bar
          dataKey="expense"
          fill="#d15b49"
          activeBar={<Rectangle fill="gold" stroke="purple" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MonthlyBarChart;
