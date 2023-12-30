/* eslint-disable react/no-unescaped-entities */
import shoppingcart from "../../../assets/shopping-cart.svg";
import { Link } from "react-router-dom";
import SmartphoneIcon from "@mui/icons-material/Smartphone";

const EmptyCart = () => {
  return (
    <div className="empty-cart">
      <img src={shoppingcart} alt="shopping-cart" />
      <h3>
        Your cart is <span>empty</span>.
      </h3>
      <p className="text-muted">
        Looks like you haven't add anything to your cart yet.
      </p>
      <Link
        to="/products"
        className="cart-buttons cart-buttons-primary rounded"
      >
        <span>Browse smartphones</span>
        <SmartphoneIcon />
      </Link>
    </div>
  );
};

export default EmptyCart;
