import { useContext } from "react";
import PaginationContext from "./PaginationContext";
import "./Products.css";

const DisplayedProductsInfo = () => {
  const PaginationCtx = useContext(PaginationContext);
  return (
    <p className="total-products">
      Showing{" "}
      <span>
        {(PaginationCtx.currentPage - 1) * PaginationCtx.perPage + 1}-
        {PaginationCtx.totalLength <
        (PaginationCtx.currentPage - 1) * PaginationCtx.perPage +
          PaginationCtx.perPage
          ? PaginationCtx.totalLength
          : (PaginationCtx.currentPage - 1) * PaginationCtx.perPage +
            PaginationCtx.perPage}
      </span>{" "}
      of <span>{PaginationCtx.totalLength}</span> products
    </p>
  );
};

export default DisplayedProductsInfo;
