import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL, IMAGES_URL } from "../../../shared/URLs";
import axios from "axios";
import "./Products.css";

const SearchProduct = () => {
  const [smartphones, setSmartphones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/phones`)
      .then((res) => {
        setSmartphones(res.data);
        //console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const searchClick = () => {
    if (!value) {
      return;
    }
    navigate(`/products/${value}`);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-start">
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
        <button className="smartphone-search-btn">
          <SearchIcon />
        </button>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-start">
      <Autocomplete
        id="smartphone-search"
        sx={{ width: 300 }}
        options={smartphones}
        autoHighlight
        onChange={(event, newValue) => {
          setValue(newValue.phone_id);
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
      <button onClick={searchClick} className="smartphone-search-btn">
        <SearchIcon />
      </button>
    </div>
  );
};

export default SearchProduct;
