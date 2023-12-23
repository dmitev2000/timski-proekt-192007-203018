import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useContext, useEffect } from "react";
import PaginationContext from "./PaginationContext";

const ProductsPagination = () => {
  const PaginationCtx = useContext(PaginationContext);

  const handleChange = (event, value) => {
    PaginationCtx.updateCurrentPage(value);
  };

  const handleProductsPerPageChange = (event) => {
    PaginationCtx.updatePerPage(event.target.value);
  };

  useEffect(() => {}, [PaginationCtx.totalLength, PaginationCtx.perPage]);

  return (
    <div className="w-100 d-flex justify-content-end align-items-center gap-5 py-3">
      <Box sx={{ width: 100 }}>
        <FormControl fullWidth size="small">
          <InputLabel id="products-per-page-label">Per page</InputLabel>
          <Select
            labelId="products-per-page-label"
            id="products-per-page"
            label="Per page"
            value={PaginationCtx.perPage}
            onChange={handleProductsPerPageChange}
          >
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Pagination
        count={Math.ceil(PaginationCtx.totalLength / PaginationCtx.perPage)}
        page={PaginationCtx.currentPage}
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
        )}
        onChange={handleChange}
      />
    </div>
  );
};

export default ProductsPagination;
