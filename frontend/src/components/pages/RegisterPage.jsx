/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
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
  const [shop, setShop] = useState("");
  const [newShop, setNewShop] = useState(false);
  const [newShopName, setNewShopName] = useState("");
  const [error, setError] = useState(null);
  const [shopList, setShopList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/shops`)
      .then((res) => {
        setShopList(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleRegister = (event) => {
    event.preventDefault();

    setError(null);
    if (password !== confPassword) {
      setError("Passwords don't match.");
      return;
    }
    if (seller && newShop) {
      //const form = document.getElementById("registerForm");
      const formData = new FormData(event.currentTarget);
      // const formData = new FormData();

      // formData.append("username", username);
      // formData.append("password", password);
      // formData.append("seller", seller);

      // formData.append("shop", shop);
      // formData.append("newShop", newShop);
      // formData.append("newShopName", newShopName);

      // const imageInput = document.getElementById("image");
      // formData.append("image", imageInput.files[0]);

      axios
        .post(`${API_BASE_URL}/auth/register-seller`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res.data);
          FireSuccessNotification(res.data);
          navigate("/login");
        })
        .catch((err) => {
          setError(err.response.data);
          console.log(err);
        });
    } else {
      axios
        .post(
          `${API_BASE_URL}/auth/register`,
          { username, password, seller, shop },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          FireSuccessNotification(res.data);
          navigate("/login");
        })
        .catch((err) => {
          setError(err.response.data);
          console.log(err);
        });
    }
  };

  return (
    <div className="auth">
      <form
        onSubmit={handleRegister}
        id="registerForm"
        encType="multipart/form-data"
      >
        <h3 className="text-light">Register</h3>
        <input
          id="username"
          type="text"
          placeholder="Username"
          name="username"
          className="form-control"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          required
        />
        <input
          id="password"
          type="password"
          placeholder="Password"
          name="password"
          className="form-control"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />
        <input
          id="confirmPassword"
          type="password"
          placeholder="Confirm password"
          name="confirmPassword"
          className="form-control"
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
                id="seller"
                name="seller"
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
        {seller && !newShop && shopList && (
          <select
            id="shop"
            onChange={(e) => setShop(e.target.value)}
            className="form-select form-control"
            name="shop"
            value={shop}
            required={seller && !newShop}
          >
            <option value={""}>Select shop</option>
            {shopList.map((shop) => {
              return (
                <option key={shop.shop_id} value={shop.shop_id}>
                  {shop.shop_name}
                </option>
              );
            })}
          </select>
        )}
        {seller && (
          <FormGroup className="mt-0">
            <FormControlLabel
              control={
                <Checkbox
                  id="newShop"
                  name="newShop"
                  style={{
                    color: "white",
                  }}
                />
              }
              label="Couldn't find your shop?"
              onChange={(e) => {
                setNewShop(e.target.checked);
              }}
              style={{
                color: "white",
              }}
            />
          </FormGroup>
        )}
        {newShop && (
          <>
            <input
              type="text"
              placeholder="Shop name"
              name="newShopName"
              id="newShopName"
              className="form-control"
              required={seller && newShop}
              onChange={(e) => {
                setNewShopName(e.target.value);
              }}
            />
            <div className="form-group mb-3">
              <label className="form-label text-light" htmlFor="shop-logo">
                Shop logo
              </label>
              <input
                required={seller && newShop}
                className="form-control"
                type="file"
                id="image"
                name="image"
                accept="image/png, image/gif, image/jpeg"
              />
            </div>
          </>
        )}
        <input type="submit" className="rounded" value="Submit" />
      </form>
    </div>
  );
};

export default RegisterPage;
