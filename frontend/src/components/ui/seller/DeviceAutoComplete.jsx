/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {
  FireErrorNotification,
  FireSuccessNotification,
} from "../../../shared/ShowNotification";
import Product from "../products/Product";
import { AuthContext } from "../../../shared/AuthContext";
import { useState, useEffect, useContext } from "react";
import { API_BASE_URL, IMAGES_URL } from "../../../shared/URLs";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const DeviceAutoComplete = () => {
  const location = useLocation();
  const state = location.state;
  const [smartphones, setSmartphones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [color, setColor] = useState("");
  const [menuColors, setMenuColors] = useState([]);
  const AuthCtx = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post(
        `${API_BASE_URL}/phones/devices/for-seller`,
        {
          shop_id: AuthCtx.user.user.shop_id,
        },
        {
          headers: {
            Authorization: `Bearer ${AuthCtx.user.token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setSmartphones(res.data);
        if (state !== null && state.selected !== null && state.price !== null) {
          setValue(res.data.filter((el) => el.phone_id === state.selected)[0]);
          setPrice(+state.price);
        }
        //console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        FireErrorNotification(
          "Couldn't get the data from the server. Please reload the page."
        );
      });
  }, []);

  useEffect(() => {
    if (value && value.phone_id) {
      axios
        .get(`${API_BASE_URL}/phones/devices/colors?phone_id=${value.phone_id}`)
        .then((res) => {
          setMenuColors(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [value]);

  const Save = () => {
    axios
      .post(
        `${API_BASE_URL}/seller/update-device`,
        {
          phone_id: value.phone_id,
          price: price,
          shop_id: AuthCtx.user.user.shop_id,
        },
        {
          headers: {
            Authorization: `Bearer ${AuthCtx.user.token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        FireSuccessNotification(res.data);
        navigate("/our-catalogue");
      })
      .catch((err) => FireErrorNotification(err.response.data));
  };

  const updateStock = (event) => {
    event.preventDefault();
    axios
      .put(
        `${API_BASE_URL}/seller/update-stock`,
        {
          phone_id: value.phone_id,
          shop_id: AuthCtx.user.user.shop_id,
          color: color.toLowerCase(),
          quantity: stock,
        },
        {
          headers: {
            Authorization: `Bearer ${AuthCtx.user.token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        //console.log(res.data);
        FireSuccessNotification("Updated successfully!");
      })
      .catch((err) => {
        //console.log(err);
        FireErrorNotification("Something went wrong... Please try again!");
      });
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-start flex-column gap-5">
        <Autocomplete
          sx={{ width: 300 }}
          options={[{ label: "" }]}
          autoHighlight
          onChange={(event, newValue) => {
            setValue(newValue.phone_name);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Loading..."
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password",
              }}
              disabled
            />
          )}
        />
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-start flex-column flex-wrap gap-5">
      {value && <h5 className="text-muted">Price</h5>}
      <div className="d-flex gap-5 align-items-center flex-wrap justify-content-start">
        <Autocomplete
          id="smartphone-search"
          sx={{ width: 300 }}
          options={smartphones}
          value={value || null}
          autoHighlight
          onChange={(event, newValue) => {
            newValue ? setValue(newValue) : setValue("");
            newValue
              ? setPrice(newValue.price !== null ? newValue.price : 0)
              : setPrice(0);
          }}
          getOptionLabel={(option) =>
            option.brand_name !== "Apple"
              ? option.brand_name + " " + option.phone_name
              : option.phone_name
          }
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              <img
                loading="lazy"
                width="20"
                src={`${IMAGES_URL}/brands/${option.brand_logo}`}
                alt={option.phone_name}
              />
              {option.brand_name !== "Apple" && option.brand_name}{" "}
              {option.phone_name}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search smartphone"
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password",
              }}
            />
          )}
        />
        {value && (
          <div className="d-flex align-items-center flex-wrap gap-5">
            <TextField
              id="filled-number"
              label="Price"
              type="number"
              value={price}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
            <Button variant="outlined" onClick={Save}>
              Save
            </Button>
          </div>
        )}
      </div>
      {value && (
        <>
          <h5 className="text-muted">Stock</h5>
          <form
            onSubmit={updateStock}
            className="d-flex justify-content-start align-items-center flex-wrap gap-5"
          >
            <TextField
              id="stock-number"
              label="Quantity"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onChange={(e) => {
                setStock(+e.target.value);
              }}
              required
            />
            <FormControl sx={{ minWidth: "220px" }} size="medium" required>
              <InputLabel id="brand-label">Color</InputLabel>
              <Select
                required
                labelId="color-label"
                id="color"
                label="Color"
                name="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {menuColors &&
                  menuColors.map((element) => {
                    return (
                      <MenuItem value={element.color} key={element.color}>
                        {element.color}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
            <Button type="submit" variant="outlined">
              Update stock
            </Button>
          </form>
        </>
      )}
      <div>
        {value ? (
          <div>
            <Product data={value} />
          </div>
        ) : (
          <p className="text-muted">Please select a smartphone.</p>
        )}
      </div>
    </div>
  );
};

export default DeviceAutoComplete;
