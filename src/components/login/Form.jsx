import useUserStore from "@/stores/userStore";
import { useState, useEffect } from "react";

const LoginForm = () => {
  const { login, error, token, user } = useUserStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (token) {
      window.location.href = `/${user.id}`;
    }
  }, [token]);

  const handleUsername = (e) => {
    setUsername(e.target.value);
    console.log(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    console.log(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <main className="flex flex-col items-center">
      {error && <p style={{ color: "red" }}>{error}</p>}
      <section className="m-auto flex flex-col items-center p-5 my-10 w-[300px] md:w-[400px] border-2 border-emerald-500 rounded-4xl text-sm md:text-xl">
        <form
          className="flex flex-col w-[200px] md:w-[300px] gap-4"
          onSubmit={handleLogin}
        >
          <h1 className="m-auto text-2xl font-bold ">Login</h1>
          <div className="flex flex-row gap-2">
            <h3>username:</h3>
            <input
              className="flex-1 border-2 rounded-2xl px-2 md:px-4"
              type="text"
              required
              minLength="4"
              maxLength="14"
              size="8"
              onChange={handleUsername}
            />
          </div>
          <div className="flex flex-row gap-2">
            <h3>password:</h3>
            <input
              className="flex-1 border-2 rounded-2xl px-2 md:px-4"
              type="password"
              required
              minLength="4"
              maxLength="20"
              size="8"
              onChange={handlePassword}
            />
          </div>
          <button
            className="m-auto px-5 w-30 h-10 bg-zinc-950 text-white font-semibold rounded-2xl 
            hover:scale-105 hover:opacity-90 
            bg-gradient-to-r hover:from-emerald-800 hover:to-emerald-600
            transition-all duration-500"
          >
            Sing in
          </button>
        </form>
      </section>
      <span className="m-auto">
        You don't have an account?{" "}
        <a href="/register" className="text-blue-500 hover:underline">
          Sing up
        </a>{" "}
      </span>
      <span className="m-auto pb-20">
        Enter as{" "}
        <a href="/guess" className="text-blue-500 hover:underline">
          guess
        </a>
      </span>
    </main>
  );
};

export default LoginForm;
