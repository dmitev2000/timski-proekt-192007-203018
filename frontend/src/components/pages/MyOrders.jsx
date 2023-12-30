/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect, useContext } from "react";
import PageBreadcrumbs from "../layout/PageBreadcrumbs";
import LoadingComponent from "../ui/LoadingComponent";
import { AuthContext } from "../../shared/AuthContext";
import OrderList from "../ui/orders/OrderList";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../shared/URLs";
import { Button } from "@mui/material";
import axios from "axios";
import PageWrapper from "../layout/PageWrapper";

const MyOrders = () => {
  const AuthCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const links = [
    { name: "Home", path: "/" },
    { name: "My Orders", path: "/orders" },
  ];

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/orders/my-orders/${AuthCtx.user.user.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AuthCtx.user.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <PageWrapper>
      <div className="px-5">
        <div className="mt-3">
          <PageBreadcrumbs links={links} />
        </div>
        {orders.length === 0 ? (
          <>
            <h5 className="text-muted my-5">You don't have any orders yet.</h5>
            <Button variant="outlined" onClick={() => navigate("/products")}>
              Products
            </Button>
          </>
        ) : (
          <OrderList orders={orders} />
        )}
      </div>
    </PageWrapper>
  );
};

export default MyOrders;
