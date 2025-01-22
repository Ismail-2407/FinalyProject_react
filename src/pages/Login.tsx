import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { loginSuccess, loginFailed, loading } from "../store/authSlice";
import { User } from "../types";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error, loading: isLoading } = useAppSelector((state) => state.auth);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loading());
    try {
      const response = await fetch("http://localhost:3000/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const users: User[] = await response.json();

      const user = users.find(
        (u): u is User => u.email === email && u.password === password
      );

      if (!user) {
        throw new Error("Invalid credentials");
      }
      dispatch(loginSuccess({ id: user.id, email: user.email }));
      navigate("/");
    } catch (err) {
      if (err instanceof Error) {
        dispatch(loginFailed(err.message || "Failed to login"));
      } else {
        dispatch(loginFailed("Failed to login"));
      }
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
