/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { API_BASE_URL, IMAGES_URL } from "../../../shared/URLs";
import { AuthContext } from "../../../shared/AuthContext";
import Device from "../../ui/seller/Device";
import LoadingComponent from "../../ui/LoadingComponent";

const OurCatalogue = () => {
  const AuthCtx = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [shop, setShop] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    axios
      .post(
        `${API_BASE_URL}/seller/catalogue`,
        {
          shop_id: AuthCtx.user.user.shop_id,
        },
        {
          headers: {
            Authorization: `Bearer ${AuthCtx.user.token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setData(res.data.catalogue);
        setShop(res.data.shop);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <div className="container py-5 mt-5 px-4">
      <div
        style={{ background: "#1976d2" }}
        className="rounded text-light p-3 d-flex justify-content-between align-items-center mb-5 mt-3"
      >
        <h3 className="m-0">Our Catalogue</h3>
        <div>
          <img
            style={{ maxWidth: "150px", maxHeight: "50px" }}
            src={`${IMAGES_URL}/shop/${shop.shop_logo}`}
            alt={shop.shop_name}
          />
        </div>
      </div>
      {error === null ? (
        <div className="device-list">
          {data.map((el) => {
            return <Device key={el.phone_id} data={el} />;
          })}
        </div>
      ) : (
        <p className="text-danger">Something went wrong</p>
      )}
    </div>
  );
};

export default OurCatalogue;
