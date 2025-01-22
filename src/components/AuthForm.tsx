import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks";
import { loginSuccess, loginFailed, loading } from "../store/authSlice";
import { User } from "../types";

interface AuthFormProps {
  isLogin?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ isLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loading());

    try {
      const url = isLogin
        ? "http://localhost:3000/users"
        : "http://localhost:3000/users";
      const method = isLogin ? "GET" : "POST";

      const body = isLogin
        ? null
        : JSON.stringify({
            id: 1,
            email,
            password,
          });

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      if (isLogin) {
        const users: User[] = await response.json();
        const user = users.find(
          (u): u is User => u.email === email && u.password === password
        );
        if (!user) throw new Error("Invalid credentials");
        dispatch(loginSuccess({ id: user.id, email: user.email }));
        navigate("/");
      } else {
        dispatch(loginSuccess({ id: 1, email: email }));
        navigate("/");
      }
    } catch (err) {
      if (err instanceof Error) {
        dispatch(loginFailed(err.message));
      } else {
        dispatch(loginFailed("An unknown error occurred."));
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">{isLogin ? "Login" : "Register"}</button>
    </form>
  );
};

export default AuthForm;
