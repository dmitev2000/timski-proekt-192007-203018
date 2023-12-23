import { Card } from "@mui/material";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { IMAGES_URL } from "../../../shared/URLs";

const PhoneComponent = ({ phone_data }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${phone_data.phone_id}`);
  };

  return (
    <div className="product" onClick={handleClick}>
      <Card
        sx={{
          p: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <img
          src={`${IMAGES_URL}/devices/${phone_data.phone_img}`}
          alt={phone_data.phone_name}
        />
        <div>
          <h4 className="mb-0">
            {phone_data.brand_name !== "Apple" && phone_data.brand_name}{" "}
            {phone_data.phone_name}
          </h4>
          <h4>({phone_data.a_year})</h4>
        </div>
      </Card>
    </div>
  );
};

PhoneComponent.propTypes = {
  phone_data: PropTypes.object.isRequired,
};

export default PhoneComponent;
