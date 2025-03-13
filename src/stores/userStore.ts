import { create } from "zustand";
import { persist } from "zustand/middleware";
import { addMovement, getMovements } from "@/utils/movements";
import { addGoal, getGoals, removeGoal } from "@/utils/goals";

type Movement = {
  amount: number;
  type: "income" | "expense";
  category?: string;
  date: string;
  userId: string;
};

type Goal = {
  amount: number;
  reason: string;
  category?: string;
  userId: string;
};

type User = {
  id: string;
  username: string;
};

type State = {
  movements: Movement[];
  goals: Goal[];
  currency: number;
  user: User | null;
  token: string | null;
  error: string | null;
};

type Action = {
  setCurrency: (currency: number) => void;
  addMovement: (movements: Movement) => void;
  setMovements: (id: string) => void;
  addGoal: (goal: Goal) => void;
  setGoals: (id: string) => void;
  removeGoal: (goalId: string, userId: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
};

const useUserStore = create<State & Action>()(
  persist(
    (set, get) => ({
      movements: [],
      goals: [],
      currency: 0,
      user: null,
      token: null,
      error: null,

      addMovement: async (movement) => {
        try {
          const newMovement = await addMovement(movement);
          set({ movements: [...get().movements, newMovement] });
        } catch (error) {
          set({ error: (error as Error).message });
        }
      },
      setMovements: async (id) => {
        try {
          const movementsDb = await getMovements(id);
          set({ movements: movementsDb });
        } catch (error) {
          set({ error: (error as Error).message });
        }
      },
      addGoal: async (goal) => {
        try {
          const newGoal = await addGoal(goal);
          set({ goals: [...get().goals, newGoal] });
        } catch (error) {
          set({ error: (error as Error).message });
        }
      },
      setGoals: async (id) => {
        try {
          const goalsDb = await getGoals(id);
          set({ goals: goalsDb });
        } catch (error) {
          set({ error: (error as Error).message });
        }
      },
      removeGoal: async (goalId, userId) => {
        try {
          await removeGoal(goalId);
          const newGoals = await getGoals(userId);
          set({ goals: newGoals });
        } catch (error) {
          set({ error: (error as Error).message });
        }
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

      register: async (username, password) => {
        try {
          const res = await fetch(
            "https://fintrack-backend-0tq2.onrender.com/api/users",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ username, password }),
            }
          );

          if (!res.ok) throw new Error("Error en el registro");
          set({ error: null });
        } catch (error) {
          set({ error: (error as Error).message });
        }
      },

      login: async (username, password) => {
        try {
          const res = await fetch(
            "https://fintrack-backend-0tq2.onrender.com/api/login",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ username, password }),
            }
          );

          const data = await res.json();
          if (!res.ok) throw new Error(data.message);

          localStorage.setItem("token", data.token);
          set({
            user: { username: username, id: data.id },
            token: data.token,
            error: null,
          });
        } catch (error) {
          set({ error: (error as Error).message });
        }
      },
    }),
    { name: "userStorage" }
  )
);

export default useUserStore;
