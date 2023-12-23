import PropTypes from "prop-types";
import PhoneComponent from "./PhoneComponent";
import "./Products.css";
import { useContext } from "react";
import PaginationContext from "./PaginationContext";

const ProductList = ({ data }) => {
  const PaginationCtx = useContext(PaginationContext);

  return (
    <div className="d-flex justify-content-center align-content-stretch flex-wrap gap-3 pt-4">
      {data
        .filter((el, index) => {
          return (
            index >= (PaginationCtx.currentPage - 1) * PaginationCtx.perPage &&
            index <
              (PaginationCtx.currentPage - 1) * PaginationCtx.perPage +
                PaginationCtx.perPage
          );
        })
        .map((el) => {
          return <PhoneComponent key={el.phone_id} phone_data={el} />;
        })}
    </div>
  );
};

ProductList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default ProductList;
