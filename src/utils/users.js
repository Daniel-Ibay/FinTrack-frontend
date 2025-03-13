const baseUrl = `https://fintrack-backend-0tq2.onrender.com/api`;

export const getUsers = async () => {
  const response = await fetch(`${baseUrl}/users`);
  const users = await response.json();
  return users;
};

export const getUser = async (id) => {
  const response = await fetch(`${baseUrl}/users/${id}`);
  const user = await response.json();
  return user;
};
