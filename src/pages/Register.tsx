import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { loginSuccess, loginFailed, loading } from "../store/authSlice";
import { User } from "../types";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error, loading: isLoading } = useAppSelector((state) => state.auth);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loading());
    try {
      const response = await fetch("http://localhost:3000/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const users: User[] = await response.json();
      const lastId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
      const newUser: User = {
        id: lastId,
        email: email,
        password: password,
      };

      const createResponse = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      if (!createResponse.ok) {
        throw new Error("Failed to register");
      }

      dispatch(loginSuccess({ id: lastId, email: email }));
      navigate("/");
    } catch (err) {
      if (err instanceof Error) {
        dispatch(loginFailed(err.message || "Failed to register"));
      } else {
        dispatch(loginFailed("Failed to register"));
      }
    }
  };

  return (
    <div>
      <h1>Register</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleRegister}>
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
          {isLoading ? "Loading..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
