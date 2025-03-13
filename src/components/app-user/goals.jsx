import useUserStore from "@/stores/userStore";
import "@/styles/numberInput.css";
import { useEffect } from "react";

const Goals = ({ id }) => {
  const goals = useUserStore((state) => state.goals);
  const addGoal = useUserStore((state) => state.addGoal);
  const setGoals = useUserStore((state) => state.setGoals);
  const removeGoal = useUserStore((state) => state.removeGoal);

  useEffect(() => {
    setGoals(id);
  }, []);

  useEffect(() => {
    console.log(goals);
  }, [goals]);

  const handleAddGoal = (e) => {
    e.preventDefault();
    const Goal = {
      amount: e.target.amount.value,
      reason: e.target.reason.value,
      category: e.target.category.value || "",
      userId: id,
    };
    addGoal(Goal);
    e.target.amount.value = null;
    e.target.reason.value = "";
    e.target.category.value = "";
  };

  const handleRemoveGoal = (goalId, userId) => {
    removeGoal(goalId, userId);
  };

  return (
    <div className="flex flex-row">
      <section className="flex flex-1/2 flex-col">
        <h2 className="mx-auto my-8 px-6 py-4 text-4xl font-bold border-2 rounded-4xl border-zinc-500 hover:border-emerald-500 duration-1000">
          Goals
        </h2>
        <div className="m-auto mt-10">
          <table className="table-auto text-left min-w-full divide-y divide-zinc-500 text-xl hover:cursor-default">
            <thead className="">
              <tr className="">
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Reason</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>

            <tbody>
              <tr className="h-[20px]"></tr>
              {goals.map((goal) => (
                <tr
                  key={goal.id}
                  className="rounded-lg overflow-hidden hover:bg-zinc-500/10 duration-150"
                >
                  <td className="px-4 py-2 rounded-tl-lg rounded-bl-lg w-5">
                    {goal.amount}
                  </td>
                  <td className="px-4 py-2">{goal.category}</td>
                  <td className="px-4 py-2 gap-3">{goal.reason}</td>
                  <td className="px-4 py-2 rounded-tr-lg rounded-br-lg">
                    <button
                      onClick={() => handleRemoveGoal(goal.id, id)}
                      className="bg-rose-800 rounded-xl p-1 border-rose-800 border-2 hover:border-2 hover:border-rose-200 duration-500 font-sans font-semibold"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="flex flex-1/2 flex-col">
        <h2 className="mx-auto my-8 px-6 py-4 text-4xl font-bold border-2 rounded-4xl border-zinc-500 mb-20 hover:border-emerald-500 duration-1000">
          Add Goals
        </h2>
        <form
          className="flex flex-col m-auto my-10 gap-6"
          onSubmit={handleAddGoal}
          autoComplete="off"
        >
          <section className="flex flex-row">
            <section className="flex flex-col text-xl p-10 py-2 gap-3 flex-1">
              <span>Amount: </span>
              <span>Category (optional): </span>
              <span>Reason:</span>
            </section>
            <section>
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
              <span className="text-xl mx-0 flex pr-10 py-2">
                <input
                  className="border-2 rounded-xl border-zinc-500 px-2 ml-4"
                  type="text"
                  size={20}
                  name="reason"
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

export default Goals;
