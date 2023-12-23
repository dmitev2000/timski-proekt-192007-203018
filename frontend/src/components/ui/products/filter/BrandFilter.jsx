import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState, useEffect, useContext } from "react";
import { API_BASE_URL } from "../../../../shared/URLs";
import FilterContext from "./FilterProductsContext";
import axios from "axios";

const BrandFilter = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const FilterCtx = useContext(FilterContext);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    FilterCtx.updateBrands(
      typeof value === "string" ? value.split(",") : value
    );
  };

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/phones/brands/count`)
      .then((res) => {
        setError(null);
        setBrands(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  if (loading) {
    return (
      <FormControl sx={{ width: 200 }} size="small" disabled>
        <InputLabel id="brand-filter-loading-label">Loading...</InputLabel>
        <Select labelId="brand-filter-loading-label" value="" />
      </FormControl>
    );
  }

  return (
    <div>
      {error ? (
        <span className="text-danger">Some error occured...</span>
      ) : (
        <FormControl sx={{ width: 200 }} size="small">
          <InputLabel id="brand-filter-label">Brand</InputLabel>
          <Select
            labelId="brand-filter-label"
            id="brand-filter"
            multiple
            value={FilterCtx.brands}
            onChange={handleChange}
            input={<OutlinedInput label="Brand" />}
            MenuProps={MenuProps}
          >
            {brands.map((brand) => (
              <MenuItem key={brand.brand_name} value={brand.brand_name}>
                {brand.brand_name} ({brand.number_of_devices})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </div>
  );
};

export default BrandFilter;
