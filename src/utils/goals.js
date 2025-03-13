const baseUrl = `https://fintrack-backend-0tq2.onrender.com/api`;

export const getGoals = async (id) => {
  const response = await fetch(`${baseUrl}/goals/${id}`);
  const goals = await response.json();
  return goals;
};

export const addGoal = async (goal) => {
  try {
    const response = await fetch(`${baseUrl}/goals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(goal),
    });

    if (!response.ok) {
      throw new Error("Error to add new goal");
    }

    return await response.json();
  } catch (error) {
    console.error("Error to add new goal", error);
    return { error: error.message };
  }
};

export const removeGoal = async (goalId) => {
  try {
    const response = await fetch(`${baseUrl}/goals/${goalId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al eliminar la meta");
    }

    const result = await response.json();

    return result;
  } catch (error) {
    return { error: error.message };
  }
};
