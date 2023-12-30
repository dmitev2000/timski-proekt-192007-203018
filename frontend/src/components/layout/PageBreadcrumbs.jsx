import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const PageBreadcrumbs = ({ links }) => {
  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        {links.map((link, index) => {
          return (
            <Link
              key={`${link.name}-${index}`}
              className={
                index === links.length - 1
                  ? "text-primary fw-bold text-uppercase opacity-100 bc-link"
                  : "text-primary fw-bold text-uppercase opacity-50 bc-link"
              }
              to={link.path}
            >
              {link.name}
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
};

PageBreadcrumbs.propTypes = {
  links: PropTypes.array.isRequired,
};

export default PageBreadcrumbs;
