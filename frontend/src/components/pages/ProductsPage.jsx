/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import PageWrapper from "../layout/PageWrapper";
import ProductList from "../ui/products/ProductList";
import SearchProduct from "../ui/products/SearchProduct";
import FilterProducts from "../ui/products/filter/FilterProducts";
import { API_BASE_URL } from "../../shared/URLs";
import axios from "axios";
import LoadingComponent from "../ui/LoadingComponent";
import FilterContext from "../ui/products/filter/FilterProductsContext";
import PaginationContext from "../ui/products/PaginationContext";
import ProductsPagination from "../ui/products/ProductsPagination";
import DisplayedProductsInfo from "../ui/products/DisplayedProductsInfo";

const ProductsPage = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const FilterCtx = useContext(FilterContext);
  const PaginationCtx = useContext(PaginationContext);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios
      .get(`${API_BASE_URL}/phones`, {
        params: {
          brands:
            FilterCtx.brands.length > 0 ? FilterCtx.brands.join(";") : null,
          years: FilterCtx.years.length > 0 ? FilterCtx.years.join(";") : null,
        },
      })
      .then((res) => {
        //console.log(res.data);
        setProducts(res.data);
        PaginationCtx.updateTotalLength(res.data.length);
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [FilterCtx.brands, FilterCtx.years, PaginationCtx.currentPage]);

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <PageWrapper>
      {error !== null ? (
        <h3 className="text-danger">{error.message}</h3>
      ) : (
        <div className="mx-4">
          <div className="d-flex justify-content-between align-items-center">
            <h3>Products Page</h3>
            <SearchProduct />
          </div>
          <FilterProducts />
          <DisplayedProductsInfo />
          <ProductList data={products} />
          <ProductsPagination />
        </div>
      )}
    </PageWrapper>
  );
};

export default ProductsPage;
