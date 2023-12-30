import stripe_img from "../../../assets/stripe.png";
import LockIcon from "@mui/icons-material/Lock";
import { useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../../shared/AuthContext";
import { FireSuccessNotification } from "../../../shared/ShowNotification";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../../shared/URLs";

const CheckoutInfo = ({ subtotal }) => {
  const AuthCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    axios
      .post(
        `${API_BASE_URL}/orders/place-order`,
        {
          user_id: AuthCtx.user.user.id,
        },
        {
          headers: {
            Authorization: `Bearer ${AuthCtx.user.token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        FireSuccessNotification(res.data);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-start align-items-end flex-column">
      <div className="w-100 d-flex justify-content-between">
        <h5>Subtotal:</h5>
        <h5 className="fw-bold">
          <i>{subtotal.toFixed(2)} MKD</i>
        </h5>
      </div>
      <p className="text-muted">
        Shipping taxes and discounts are calculated at checkout.
      </p>
      <button
        className="w-100 cart-buttons cart-buttons-primary rounded checkout-btn"
        onClick={handleCheckout}
      >
        Checkout
      </button>
      <div className="w-100 d-flex align-items-center gap-0 flex-column">
        <p className="m-0 secured-by">
          <LockIcon /> Secured by Stripe
        </p>
        <img
          style={{ maxWidth: "80px" }}
          src={stripe_img}
          alt="stripe api logo"
        />
      </div>
    </div>
  );
};

CheckoutInfo.propTypes = {
  subtotal: PropTypes.number.isRequired,
};

export default CheckoutInfo;
