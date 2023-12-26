import ApplyCoupons from "./ApplyCoupons";
import CheckoutInfo from "./CheckoutInfo";
import { PropTypes } from "prop-types";

const CartFooter = ({ subtotal }) => {
  return (
    <div className="w-100 d-flex justify-content-between align-items-start gap-5 flex-wrap">
      <ApplyCoupons />
      <CheckoutInfo subtotal={subtotal} />
    </div>
  );
};

CartFooter.propTypes = {
  subtotal: PropTypes.number.isRequired,
};

export default CartFooter;
