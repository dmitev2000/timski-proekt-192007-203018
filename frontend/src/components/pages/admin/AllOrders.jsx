/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext, useState } from "react";
import PageBreadcrumbs from "../../layout/PageBreadcrumbs";
import DataTableComponent from "../../ui/admin/DataTableComponent";
import axios from "axios";
import { AuthContext } from "../../../shared/AuthContext";
import { API_BASE_URL } from "../../../shared/URLs";

const AllOrders = () => {
  const links = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Orders", path: "/admin/dashboard/orders" },
  ];

  const AuthCtx = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/orders/all-orders`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AuthCtx.user.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container py-3 mt-5 px-4">
      <div className="my-5">
        <PageBreadcrumbs links={links} />
      </div>
      {loading ? (
        <h3>Loading...</h3>
      ) : error === null ? (
        <DataTableComponent orders={orders} />
      ) : (
        <h5 className="text-danger fw-bold">{error}</h5>
      )}
    </div>
  );
};

export default AllOrders;
