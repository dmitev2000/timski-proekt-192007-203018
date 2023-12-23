import BrandFilter from "./BrandFilter";
import YearFilter from "./YearFilter";
import FilterContext from "./FilterProductsContext";
import { useContext } from "react";
import "../Products.css";

const FilterProducts = () => {
  const FilterCtx = useContext(FilterContext);

  return (
    <div className="py-3">
      <p className="text-primary fw-bold">
        Filters{" "}
        <span
          id="clear-filters"
          onClick={() => {
            FilterCtx.clearFilters();
          }}
        >
          (clear)
        </span>
      </p>
      <div className="d-flex gap-4 my-4">
        <BrandFilter />
        <YearFilter />
      </div>
    </div>
  );
};

export default FilterProducts;
