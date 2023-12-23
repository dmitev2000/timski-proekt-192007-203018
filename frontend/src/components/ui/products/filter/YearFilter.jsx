import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState, useEffect, useContext } from "react";
import { API_BASE_URL } from "../../../../shared/URLs";
import FilterContext from "./FilterProductsContext";
import axios from "axios";

const YearFilter = () => {
  const [years, setYears] = useState([]);
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
    FilterCtx.updateYears(typeof value === "string" ? value.split(",") : value);
  };

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/phones/years/distinct`)
      .then((res) => {
        setError(null);
        setYears(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  if (loading) {
    return (
      <FormControl sx={{ width: 200 }} size="small" disabled>
        <InputLabel id="year-filter-loading-label">Loading...</InputLabel>
        <Select labelId="year-filter-loading-label" value="" />
      </FormControl>
    );
  }

  return (
    <div>
      {error ? (
        <span className="text-danger">Some error occured...</span>
      ) : (
        <FormControl sx={{ width: 200 }} size="small">
          <InputLabel id="year-filter-label">Year</InputLabel>
          <Select
            labelId="year-filter-label"
            id="year-filter"
            multiple
            value={FilterCtx.years}
            onChange={handleChange}
            input={<OutlinedInput label="Year" />}
            MenuProps={MenuProps}
          >
            {years.map((year) => (
              <MenuItem key={year.a_year} value={year.a_year}>
                {year.a_year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </div>
  );
};

export default YearFilter;