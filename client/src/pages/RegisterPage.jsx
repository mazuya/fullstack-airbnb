import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleRegisterForm(e) {
    e.preventDefault();
    //URL & data sent to server
    try {
      axios.post("/register", {
        name,
        email,
        password,
      });
      alert("Registration successful.");
    } catch (e) {
      alert("Registration failed.");
    }
  }
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mt-16">Register</h1>
      <form className="max-w-md mx-auto mt-5" onSubmit={handleRegisterForm}>
        <input
          type="text"
          placeholder="John lee "
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <button className="primary">Register</button>
        <div className="py-2 text-gray-500">
          Already a member?{" "}
          <Link to={"/login"} className="underline text-semibold">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
