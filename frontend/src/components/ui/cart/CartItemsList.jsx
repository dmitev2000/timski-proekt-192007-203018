import PropTypes from "prop-types";
import CartItem from "./CartItem";

const CartItemsList = ({ cartItems }) => {
  return (
    <div className="my-5 d-flex justify-content-center flex-column align-items-center flex-wrap">
      {cartItems.map((item, index) => {
        return <CartItem key={index} item={item} />;
      })}
    </div>
  );
};

CartItemsList.propTypes = {
  cartItems: PropTypes.array.isRequired,
};

export default CartItemsList;
