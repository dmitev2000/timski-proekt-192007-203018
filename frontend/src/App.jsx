import { Route, Routes } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import LogoutPage from "./components/pages/LogoutPage";
import NotFound from "./components/pages/NotFound";
import Layout from "./components/layout/Layout";
import ProductsPage from "./components/pages/ProductsPage";
import ProductDetailsPage from "./components/pages/ProductDetailsPage";
import "./App.css";
import { FilterContextProvider } from "./components/ui/products/filter/FilterProductsContext";
import { PaginationContextProvider } from "./components/ui/products/PaginationContext";
import Cart from "./components/pages/Cart";
import { ReloadCartProvider } from "./components/ui/cart/ReloadCartContext";

function App() {
  return (
    <>
      <Layout>
        <FilterContextProvider>
          <PaginationContextProvider>
            <ReloadCartProvider>
              <Routes>
                {/* Default routes */}
                <Route path="/" element={<HomePage />} />
                {/* Auth routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/logout" element={<LogoutPage />} />
                {/* Products routes */}
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductDetailsPage />} />
                <Route path="/cart" element={<Cart />} />
                {/* Error hanler routes */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ReloadCartProvider>
          </PaginationContextProvider>
        </FilterContextProvider>
      </Layout>
    </>
  );
}

export default App;
