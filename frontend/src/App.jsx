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
import MyOrders from "./components/pages/MyOrders";
import OrderDetails from "./components/pages/OrderDetails";
import { ReloadDashboardProvider } from "./components/ui/admin/ReloadDashboardContext";
import Accounts from "./components/pages/admin/Accounts";
import Dashboard from "./components/pages/admin/Dashboard";
import Devices from "./components/pages/admin/Devices";
import AllOrders from "./components/pages/admin/AllOrders";
import Insights from "./components/pages/admin/Insights";

function App() {
  return (
    <>
      <Layout>
        <FilterContextProvider>
          <PaginationContextProvider>
            <ReloadCartProvider>
              <ReloadDashboardProvider>
                <Routes>
                  {/* Default routes */}
                  <Route path="/" element={<HomePage />} />
                  {/* Auth routes */}
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/logout" element={<LogoutPage />} />
                  {/* Products routes */}
                  <Route path="/products" element={<ProductsPage />} />
                  <Route
                    path="/products/:id"
                    element={<ProductDetailsPage />}
                  />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/orders" element={<MyOrders />} />
                  <Route path="/orders/:id" element={<OrderDetails />} />
                  {/* Admin routes */}
                  <Route path="/admin/dashboard" element={<Dashboard />} />
                  <Route
                    path="/admin/dashboard/accounts"
                    element={<Accounts />}
                  />
                  <Route
                    path="/admin/dashboard/devices"
                    element={<Devices />}
                  />
                  <Route
                    path="/admin/dashboard/orders"
                    element={<AllOrders />}
                  ></Route>
                  <Route
                    path="admin/dashboard/insights"
                    element={<Insights />}
                  ></Route>
                  {/* Error hanler routes */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </ReloadDashboardProvider>
            </ReloadCartProvider>
          </PaginationContextProvider>
        </FilterContextProvider>
      </Layout>
    </>
  );
}

export default App;
