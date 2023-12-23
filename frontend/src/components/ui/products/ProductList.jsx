import PropTypes from "prop-types";
import PhoneComponent from "./PhoneComponent";
import "./Products.css";

const ProductList = ({ data }) => {
  return (
    <div className="d-flex justify-content-center flex-wrap gap-3 pt-4">
      {data.map((el) => {
        return <PhoneComponent key={el.phone_id} phone_data={el} />;
      })}
    </div>
  );
};

ProductList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default ProductList;
