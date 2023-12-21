import { useEffect } from "react";
import PageWrapper from "../layout/PageWrapper";
import ProductList from "../ui/products/ProductList";
import SearchProduct from "../ui/products/SearchProduct";
import { Pagination } from "@mui/material";
import FilterProducts from "../ui/products/filter/FilterProducts";

const ProductsPage = () => {
  // TODO: Fetch smartphones from the api
  useEffect(() => {});

  const dummy_data = [
    {
      phone_id: 1,
      phone_name: "Test1",
      phone_img:
        "https://cdn.shopify.com/s/files/1/0824/3121/t/204/assets/14plus-1682521510056.png?v=1682521531",
      brand_name: "Brand1",
      a_year: 2023,
    },
    {
      phone_id: 2,
      phone_name: "Test2",
      phone_img:
        "https://cdn.shopify.com/s/files/1/0824/3121/t/204/assets/14plus-1682521510056.png?v=1682521531",
      brand_name: "Brand2",
      a_year: 2022,
    },
    {
      phone_id: 3,
      phone_name: "Test3",
      phone_img:
        "https://cdn.shopify.com/s/files/1/0824/3121/t/204/assets/14plus-1682521510056.png?v=1682521531",
      brand_name: "Brand2",
      a_year: 2023,
    },
  ];

  return (
    <PageWrapper>
      <div className="d-flex justify-content-between align-items-center">
        <h3>Products Page</h3>
        <SearchProduct />
      </div>
      <FilterProducts />
      <ProductList data={dummy_data} />
      <Pagination
        sx={{ float: "right", mt: 4 }}
        count={dummy_data.length}
        variant="outlined"
        shape="circular"
        showFirstButton
        showLastButton
      />
    </PageWrapper>
  );
};

export default ProductsPage;
