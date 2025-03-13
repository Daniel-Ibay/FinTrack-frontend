import { useEffect, useState } from "react";
import SimpleChart from "./movementsChart";
import MonthlyBarChart from "./incomes-expensesChart";

const BarController = () => {
  const [graph, setGraph] = useState("movements");

  return (
    <div className="p-10 pt-10 text-xl flex flex-col items-center">
      <select
        onChange={(e) => setGraph(e.target.value)}
        value={graph}
        className="border-2 rounded-xl border-zinc-500 ml-4 mb-10"
        name="type"
      >
        <option value={"movements"} className="bg-[#1a1a1a]">
          movements
        </option>
        <option value={"incomes/expenses"} className="bg-[#1a1a1a]">
          income/expenses
        </option>
      </select>
      {graph === "movements" && <SimpleChart />}
      {graph === "incomes/expenses" && <MonthlyBarChart />}
      {graph === "" && <h1 className="text-8xl font-bold">Add a movement</h1>}
    </div>
  );
};

export default BarController;
