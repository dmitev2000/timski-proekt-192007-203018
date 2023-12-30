import React from "react";
import PropTypes from "prop-types";
import DiscountIcon from "@mui/icons-material/Discount";
import ScheduleIcon from "@mui/icons-material/Schedule";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Tooltip } from "@mui/material";

const Coupon = ({ coupon_info }) => {
  return (
    <div
      className={
        new Date(coupon_info.expires) > new Date()
          ? "coupon rounded"
          : "coupon expired rounded"
      }
    >
      <DiscountIcon />
      <p className="m-0 fw-bold">{coupon_info.coupon_value} MKD</p>
      <p className="m-0">Expires on: {new Date(coupon_info.expires).toDateString()}</p>
      <p className="m-0">
        {new Date(coupon_info.expires) > new Date() ? (
          <Tooltip title="Valid">
            <TaskAltIcon />
          </Tooltip>
        ) : (
          <Tooltip title="Expired">
            <ScheduleIcon />
          </Tooltip>
        )}
      </p>
    </div>
  );
};

Coupon.propTypes = {
  coupon_info: PropTypes.object.isRequired,
};

export default Coupon;
