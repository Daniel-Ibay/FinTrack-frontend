import useUserStore from "@/stores/userStore";
import "@/styles/numberInput.css";
import { useEffect } from "react";

const Movements = ({ id }) => {
  const movements = useUserStore((state) => state.movements);
  const addMovement = useUserStore((state) => state.addMovement);
  const setMovements = useUserStore((state) => state.setMovements);
  const setCurrency = useUserStore((state) => state.setCurrency);

  useEffect(() => {
    setCurrency();
  }, [movements]);

  useEffect(() => {
    setMovements(id);
  }, []);

  const handleAddMovement = (e) => {
    e.preventDefault();
    const fecha = new Date().toLocaleString();
    const Movement = {
      amount: e.target.amount.value,
      type: e.target.type.value,
      category: e.target.category.value || "",
      date: fecha,
      userId: id,
    };
    addMovement(Movement);
  };

  return (
    <div className="flex flex-row">
      <section className="flex flex-1/2 flex-col">
        <h2 className="mx-auto my-8 px-6 py-4 text-4xl font-bold border-2 rounded-4xl border-zinc-500 hover:border-emerald-500 duration-1000">
          Movements
        </h2>
        <div className="m-auto mt-10 overflow-y-auto h-[300px]">
          <div className="pr-2">
            <table className="table-auto text-left min-w-full divide-y divide-zinc-500 text-xl hover:cursor-default">
              <thead className="">
                <tr className="">
                  <th className="px-4 py-2">Amount</th>
                  <th className="px-4 py-2">Type</th>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Date</th>
                </tr>
              </thead>

              <tbody>
                <tr className="h-[20px]"></tr>
                {movements.map((movement) => (
                  <tr
                    key={movement.date}
                    className="rounded-lg overflow-hidden hover:bg-zinc-500/10 duration-150"
                  >
                    <td className="px-4 py-2 rounded-tl-lg rounded-bl-lg w-5">
                      {movement.amount}
                    </td>
                    <td className="px-4 py-2 flex gap-3">
                      <h3 className="font-normal">{movement.type}</h3>
                    </td>
                    <td className="px-4 py-2">{movement.category}</td>
                    <td className="px-4 py-2 rounded-tr-lg rounded-br-lg">
                      {movement.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section className="flex flex-1/2 flex-col">
        <h2 className="mx-auto my-8 px-6 py-4 text-4xl font-bold border-2 rounded-4xl border-zinc-500 mb-20 hover:border-emerald-500 duration-1000">
          Add Movement
        </h2>
        <form
          className="flex flex-col m-auto my-10 gap-6"
          onSubmit={handleAddMovement}
          autoComplete="off"
        >
          <section className="flex flex-row">
            <section className="flex flex-col text-xl p-10 py-2 gap-3 flex-1">
              <span>Type:</span>
              <span>Amount: </span>
              <span>Category (optional): </span>
            </section>
            <section>
              <span className="text-xl mx-0 flex pr-10">
                <select
                  className="border-2 rounded-xl border-zinc-500 ml-4"
                  name="type"
                  required
                >
                  <option className="bg-[#1a1a1a]" value="income">
                    income
                  </option>
                  <option className="bg-[#1a1a1a]" value="expense">
                    expense
                  </option>
                </select>
              </span>
              <span className="text-xl flex pr-10 py-2">
                <input
                  className="number-input border-2 rounded-xl border-zinc-500 ml-4 px-2 appearance-none"
                  type="number"
                  size={20}
                  name="amount"
                  required
                  step="0.01"
                />
              </span>
              <span className="text-xl mx-0 pr-10 py-2">
                <input
                  className="border-2 rounded-xl border-zinc-500 px-2 ml-4"
                  type="text"
                  size={20}
                  name="category"
                  maxLength={30}
                />
              </span>
            </section>
          </section>
          <button
            type="submit"
            className="m-auto px-5 w-60 h-14 bg-zinc-950 text-white text-xl font-semibold rounded-3xl 
            hover:scale-105 hover:opacity-90 
            bg-gradient-to-r hover:from-emerald-900 hover:to-emerald-800 border-3 hover:border-emerald-500
            transition-all duration-500 hover:cursor-pointer"
          >
            Add movement
          </button>
        </form>
      </section>
    </div>
  );
};

export default Movements;
