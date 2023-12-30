/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../../shared/URLs";
import { formatDate } from "../../shared/Utils";
import { AuthContext } from "../../shared/AuthContext";
import PageBreadcrumbs from "../layout/PageBreadcrumbs";
import OrderItem from "../ui/orders/OrderItem";
import axios from "axios";
import LoadingComponent from "../ui/LoadingComponent";
import PageWrapper from "../layout/PageWrapper";

const OrderDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [orderData, setOrderData] = useState(null);
  const AuthCtx = useContext(AuthContext);

  const links = [
    { name: "Home", path: "/" },
    { name: "My Orders", path: "/orders" },
    { name: "Details", path: `/orders/${id}` },
  ];

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/orders/order-details/${id}/${AuthCtx.user.id}`)
      .then((res) => {
        console.log(res.data);
        setOrderData(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <PageWrapper>
      <div className="px-5">
        <div className="mt-3 mb-5">
          <PageBreadcrumbs links={links} />
        </div>
        <div className="d-flex justify-content-between flex-wrap">
          <h5 className="mb-4">
            Order ID: <b>{orderData[0].order_id}</b>
          </h5>
          <h5>
            Date: <b>{formatDate(orderData[0].order_date)}</b>
          </h5>
        </div>
        <h5 className="mb-4">Products:</h5>
        {orderData.map((item, index) => {
          return <OrderItem item={item} key={index} />;
        })}
      </div>
    </PageWrapper>
  );
};

export default OrderDetails;
