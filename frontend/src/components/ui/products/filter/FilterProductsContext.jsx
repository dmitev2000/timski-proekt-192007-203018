/* eslint-disable no-unused-vars */
import { createContext, useState } from "react";
import PropTypes from "prop-types";

const FilterContext = createContext({
  brands: [],
  years: [],
  updateBrands: (brands) => {},
  updateYears: (years) => {},
  clearFilters: () => {},
});

export const FilterContextProvider = (props) => {
  const [brands, setBrands] = useState([]);
  const [years, setYears] = useState([]);

  const updateBrands = (newValue) => {
    setBrands(() => newValue);
  };

  const updateYears = (newValue) => {
    setYears(() => newValue);
  };

  const clearFilters = () => {
    setBrands(() => []);
    setYears(() => []);
  };

  const context = {
    brands,
    years,
    updateBrands,
    updateYears,
    clearFilters,
  };

  return (
    <FilterContext.Provider value={context}>
      {props.children}
    </FilterContext.Provider>
  );
};

FilterContextProvider.propTypes = {
  children: PropTypes.any.isRequired,
};

export default FilterContext;
