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

function App() {
  return (
    <>
      <Layout>
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
          {/* Error hanler routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
