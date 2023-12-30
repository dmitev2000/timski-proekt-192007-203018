import PropTypes from "prop-types";
import ChecklistIcon from "@mui/icons-material/Checklist";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../shared/Utils";
import "./orders.css";

const OrderList = ({ orders }) => {
  const navigate = useNavigate();
 
  return (
    <div className="d-flex flex-wrap gap-5 py-5">
      {orders.map((order) => {
        return (
          <div
            key={order.order_id}
            className="order"
            title="Show details"
            onClick={() => {
              navigate(`/orders/${order.order_id}`);
            }}
          >
            <div className="order-overlay">
                Show details
            </div>
            <div className="order-header">
              <span>Order ID: {order.order_id}</span>
              <ChecklistIcon />
            </div>
            <div className="order-body">
              <AccessTimeIcon />
              {formatDate(order.order_date)}
            </div>
            <div className="order-footer">{(+order.total).toFixed(2)} MKD</div>
          </div>
        );
      })}
    </div>
  );
};

OrderList.propTypes = {
  orders: PropTypes.array.isRequired,
};

export default OrderList;
