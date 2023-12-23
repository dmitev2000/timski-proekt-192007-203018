import Card from "@mui/material/Card";
import PropTypes from "prop-types";

const PageWrapper = ({ children }) => {
  return <Card className="page-wrapper">{children}</Card>;
};

PageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageWrapper;
