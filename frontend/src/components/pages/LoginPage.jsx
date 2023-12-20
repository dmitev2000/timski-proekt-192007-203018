/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../shared/AuthContext";
import { API_BASE_URL } from "../../shared/URLs";
import axios from "axios";
import "./auth.css";
import { FireSuccessNotification } from "../../shared/ShowNotification";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const AuthCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    setError(null);
    axios
      .post(`${API_BASE_URL}/auth/login`, { username, password })
      .then((res) => {
        AuthCtx.dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        console.log(res.data);
        FireSuccessNotification("You are now logged in.");
        navigate("/");
      })
      .catch((err) => {
        setError(err.response.data);
        console.log(err);
      });
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
