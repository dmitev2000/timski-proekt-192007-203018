import PropTypes from "prop-types";
import { IMAGES_URL } from "../../../shared/URLs";
import { useNavigate } from "react-router-dom";
import "./Products.css";

const Product = ({ data }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${data.phone_id}`);
  };

  return (
    <div className="product" onClick={handleClick}>
      <img
        src={`${IMAGES_URL}/devices/${data.phone_img}`}
        alt={data.phone_name}
      />
      <h4>
        {data.brand_name !== "Apple" && data.brand_name} {data.phone_name} (
        {data.a_year})
      </h4>
    </div>
  );
};

Product.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Product;
