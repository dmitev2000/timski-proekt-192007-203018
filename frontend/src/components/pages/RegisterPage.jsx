import React, { useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import "./auth.css";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [seller, setSeller] = useState(false);
  const [error, setError] = useState(null);

  const handleRegister = (event) => {
    // TODO: AJAX call to handle registration
    event.preventDefault();
    console.log(username, password, seller, confPassword);
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
