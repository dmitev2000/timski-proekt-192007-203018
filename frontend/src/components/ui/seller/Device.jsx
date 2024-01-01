import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { IMAGES_URL } from "../../../shared/URLs";
import EditIcon from "@mui/icons-material/Edit";
import { Tooltip } from "@mui/material";

const Device = ({ data }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${data.phone_id}`);
  };

  const handleEditClick = () => {
    navigate(`/add-device/`, {
      state: { selected: data.phone_id, price: data.price },
    });
  };

  return (
    <div className="device">
      <img
        className="mb-5"
        src={`${IMAGES_URL}/devices/${data.phone_img}`}
        alt={data.phone_name}
      />
      <h4 onClick={handleClick} className="m-0">
        {data.brand_name !== "Apple" && data.brand_name} {data.phone_name}
      </h4>
      <h4>{data.a_year}</h4>
      <span style={{ color: "#1976d2" }} className="fw-bold">
        {(+data.price).toFixed(2)} MKD
      </span>
      <span className="edit-product" onClick={handleEditClick}>
        <Tooltip title="Edit">
          <EditIcon />
        </Tooltip>
      </span>
    </div>
  );
};

Device.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Device;
