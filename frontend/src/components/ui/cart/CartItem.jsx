import PropTypes from "prop-types";
import { API_BASE_URL, IMAGES_URL } from "../../../shared/URLs";
import DeleteIconOutline from "@mui/icons-material/DeleteOutline";
import { useContext } from "react";
import { AuthContext } from "../../../shared/AuthContext";
import ReloadCart from "./ReloadCartContext";
import axios from "axios";
import {
  FireErrorNotification,
  FireSuccessNotification,
} from "../../../shared/ShowNotification";
import { useNavigate } from "react-router-dom";

const CartItem = ({ item }) => {
  const AuthCtx = useContext(AuthContext);
  const ReloadCartCtx = useContext(ReloadCart);
  const navigate = useNavigate();

  const removeItemFromCart = (all) => {
    axios
      .post(
        `${API_BASE_URL}/cart/remove/${AuthCtx.user.user.id}`,
        {
          phone_id: item.phone_id,
          shop_id: item.shop_id,
          color: item.color,
          all: all,
        },
        {
          headers: {
            Authorization: `Bearer ${AuthCtx.user.token}`,
          },
        }
      )
      .then((res) => {
        ReloadCartCtx.updateReload();
        FireErrorNotification(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const incrementQuantity = () => {
    axios
      .post(
        `${API_BASE_URL}/cart/add/${AuthCtx.user.user.id}`,
        {
          phone_id: item.phone_id,
          shop_id: item.shop_id,
          color: item.color,
          quantityToAdd: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${AuthCtx.user.token}`,
          },
        }
      )
      .then((res) => {
        ReloadCartCtx.updateReload();
        FireSuccessNotification(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="cart-item w-100 mt-2 mb-4 rounded">
      <div
        className="d-flex justify-content-start align-items-center gap-2"
        style={{ cursor: "pointer" }}
        onClick={() => {
          navigate(`/products/${item.phone_id}`);
        }}
      >
        <img
          src={`${IMAGES_URL}/devices/${item.phone_img}`}
          alt={item.phone_name}
        />
        <div className="p-2">
          <div className="d-flex align-items-center justify-content-start gap-3 px-2 mb-2">
            <img
              style={{
                maxHeight: "40px",
                maxWidth: "100px",
              }}
              src={`${IMAGES_URL}/brands/${item.brand_logo}`}
              alt={item.brand_name}
            />
            <h4 className="m-0">
              {item.brand_name !== "Apple" && item.brand_name} {item.phone_name}
            </h4>
          </div>
          <div className="d-flex align-items-center justify-content-start gap-3 px-2 mb-2">
            <img
              className={
                item.shop_name === "Setec"
                  ? "setec-logo-in-cart"
                  : "brand-logo-in-cart "
              }
              src={`${IMAGES_URL}/shop/${item.shop_logo}`}
              alt={item.shop_logo}
            />
            <p className="m-0">{item.shop_name}</p>
          </div>
          <div
            className="d-flex justify-content-start align-items-center px-2 gap-2"
            title={item.color}
          >
            <span className="text-muted">Color:</span>{" "}
            <div
              className="phone-color"
              style={{ background: item.color }}
            ></div>
          </div>
        </div>
      </div>
      <div className="qt-pr d-flex justify-content-end align-items-end gap-5">
        <div>
          <p className="text-muted m-0">Quantity:</p>
          <div className="quantity">
            <button
              onClick={() => removeItemFromCart(false)}
              disabled={item.quantity <= 1}
            >
              -
            </button>
            <span className="fw-bold">{item.quantity}</span>
            <button onClick={incrementQuantity}>+</button>
          </div>
        </div>
        <div>
          <p className="fw-bold mb-2">
            Each: {parseFloat(item.price).toFixed(2)} MKD
          </p>
          <p className="fw-bold m-0">
            Total: {parseFloat(item.price * item.quantity).toFixed(2)} MKD
          </p>
        </div>
      </div>
      <div className="remove-item" title="Remove from cart">
        <button onClick={() => removeItemFromCart(true)}>
          <DeleteIconOutline color="error" />
        </button>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default CartItem;
