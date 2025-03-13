import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuid } from "uuid";

type Movement = {
  amount: number;
  type: "income" | "expense";
  category?: string;
  date: string;
};

type Goal = {
  id: string;
  amount: number;
  reason: string;
  category?: string;
};

type State = {
  movements: Movement[];
  goals: Goal[];
  currency: number;
};

type Action = {
  setCurrency: (currency: number) => void;
  addMovement: (movements: Movement) => void;
  addGoal: (goals: Goal) => void;
  removeGoal: (id: string) => void;
};

const useGuessStore = create<State & Action>()(
  persist(
    (set, get) => ({
      movements: [],
      goals: [],
      currency: 0,
      addMovement: (movement) => {
        set({ movements: [...get().movements, movement] });
      },
      addGoal: (goal) => {
        set({ goals: [...get().goals, { ...goal, id: uuid() }] });
      },
      removeGoal: (id) => {
        const goals = [...get().goals];
        const newGoals = goals.filter((searchGoal) => searchGoal.id !== id);
        set({ goals: newGoals });
      },
      setCurrency: () => {
        const tempMovements = get().movements;
        const newCurrency = tempMovements.reduce(
          (total: number, mov: Movement) =>
            mov.type === "income"
              ? total + Number(mov.amount)
              : total - mov.amount,
          0
        );

        set({ currency: Math.round(newCurrency * 100) / 100 });
      },
    }),
    { name: "guess-storage" }
  )
);

export default useGuessStore;
