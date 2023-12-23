import CircularProgress from "@mui/material/CircularProgress";
import PropTypes from "prop-types";
import "./ui.css";

const LoadingComponent = ({ flag }) => {
  return (
    <div className={!flag ? "loader" : ""}>
      <CircularProgress size={60} />
    </div>
  );
};

LoadingComponent.propTypes = {
  flag: PropTypes.bool,
};

export default LoadingComponent;
