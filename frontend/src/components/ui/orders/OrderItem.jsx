import PropTypes from "prop-types";
import { IMAGES_URL } from "../../../shared/URLs";
import AppSettingsAltIcon from "@mui/icons-material/AppSettingsAlt";
import { useNavigate } from "react-router-dom";

const ProductInOrder = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div className="product-in-order">
      <img
        src={`${IMAGES_URL}/devices/${item.phone_img}`}
        alt={item.phone_name}
      />
      <div className="d-flex flex-column">
        <span className="fw-bold">
          {item.brand_name !== "Apple" && item.brand_name} {item.phone_name} (
          {item.a_year})
        </span>
        <span>{item.color}</span>
        <span>{item.shop_name}</span>
      </div>
      <div className="d-flex flex-column gap-1 mx-5">
        <span>
          Quantity: <b>{item.quantity}</b>
        </span>
        <span>
          Each: <b>{(+item.price).toFixed(2)} MKD</b>
        </span>
        <span>
          Total: <b>{(+item.price * item.quantity).toFixed(2)} MKD</b>
        </span>
      </div>
      <img className="brand" src={`${IMAGES_URL}/brands/${item.brand_logo}`} />
      <div className="details-btn" title="Show details">
        <button
          className="p-1"
          onClick={() => {
            navigate(`/products/${item.phone_id}`);
          }}
        >
          <AppSettingsAltIcon color="primary" />
        </button>
      </div>
    </div>
  );
};

ProductInOrder.propTypes = {
  item: PropTypes.object.isRequired,
};

export default ProductInOrder;
