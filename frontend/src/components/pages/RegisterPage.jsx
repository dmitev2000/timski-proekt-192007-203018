import { useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import "./auth.css";
import { API_BASE_URL } from "../../shared/URLs";
import { useNavigate } from "react-router-dom";
import { FireSuccessNotification } from "../../shared/ShowNotification";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [seller, setSeller] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = (event) => {
    event.preventDefault();

    setError(null);
    if (password !== confPassword) {
      setError("Passwords don't match.");
      return;
    }
    axios
      .post(`${API_BASE_URL}/auth/register`, { username, password, seller })
      .then((res) => {
        console.log(res.data);
        FireSuccessNotification(res.data);
        navigate("/login");
      })
      .catch((err) => {
        setError(err.response.data);
        console.log(err);
      });
  };

  return (
    <div className="auth">
      <form onSubmit={handleRegister}>
        <h3 className="text-light">Register</h3>
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
        <input
          type="password"
          placeholder="Confirm password"
          onChange={(e) => {
            setConfPassword(e.target.value);
          }}
          required
        />
        {error && (
          <p className="text-danger fw-bold text-center m-2">{error}</p>
        )}
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                style={{
                  color: "white",
                }}
              />
            }
            label="Register as seller?"
            onChange={(e) => {
              setSeller(e.target.checked);
            }}
            style={{
              color: "white",
            }}
          />
        </FormGroup>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default RegisterPage;
