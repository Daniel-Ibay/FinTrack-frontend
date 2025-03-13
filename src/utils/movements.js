const baseUrl = `https://fintrack-backend-0tq2.onrender.com/api`;

export const getMovements = async (id) => {
  const response = await fetch(`${baseUrl}/transactions/${id}`);
  const movements = await response.json();
  return movements;
};

export const addMovement = async (movement) => {
  try {
    const response = await fetch(`${baseUrl}/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movement),
    });

    if (!response.ok) {
      throw new Error("Error to add new movement");
    }

    return await response.json();
  } catch (error) {
    console.error("Error to add new movement", error);
    return { error: error.message };
  }
};
