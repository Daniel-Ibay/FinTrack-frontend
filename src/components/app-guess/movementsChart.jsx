import useGuessStore from "@/stores/guessStore";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const SimpleChart = () => {
  const movements = useGuessStore((state) => state.movements);
  const [data, setData] = useState([]);

  useEffect(() => {
    let newData = [];

    for (let i = 0; i < movements.length; i++) {
      const lastCurrency = i > 0 ? movements[i - 1].amount : 0;
      let value = 0;

      if (movements[i].type === "income") {
        value = Number(movements[i].amount);
      } else {
        value = -Number(movements[i].amount);
      }

      newData.push({
        time: movements[i].date,
        value: Number(lastCurrency) + value,
      });
    }

    setData(newData);
  }, [movements]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#2196F3"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SimpleChart;
