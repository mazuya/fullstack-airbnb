import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);
  async function handleLoginForm(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post("/login", { email, password });
      alert("Login successful");
      //grab information current login user
      setUser(data);
      setRedirect(true); //login สำเร็จ navigate ไปหน้าhome
    } catch (e) {
      alert("Login failed");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mt-16">Login</h1>
      <form className="max-w-md mx-auto mt-5 " onSubmit={handleLoginForm}>
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="primary">Login</button>
        <div className="py-2 text-gray-500">
          Don't have an account yet{" "}
          <Link to={"/register"} className="underline text-semibold">
            Register now
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
