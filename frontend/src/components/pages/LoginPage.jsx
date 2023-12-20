import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./auth.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = (event) => {
    event.preventDefault();
    // TODO: Implement login scenario
    console.log(username, password);
  };

  return (
    <div className="auth">
      <form onSubmit={handleLogin}>
        <h3 className="text-light">Login</h3>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />
        <input type="submit" value="Submit" />
        {error && (
          <p className="text-danger fw-bold text-center m-2">{error}</p>
        )}
        <p className="text-light text-center m-2">
          Don't have an account?
          <Link className="mx-1 text-light fw-bold" to="/register">
            Create now!
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
