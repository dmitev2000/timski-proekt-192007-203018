import { useEffect, useRef } from "react";
import DataTable from "datatables.net-dt";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";

const DataTableComponent = ({ orders }) => {
  const tableRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!tableRef.current) {
      const options = {
        language: {
          searchPlaceholder: "Order ID, Date, User, Total",
        },
      };
      tableRef.current = new DataTable("#table", options);
    }
    return () => {
      if (tableRef.current) {
        tableRef.current.destroy();
      }
    };
  }, []);

  return (
    <table
      id="table"
      className="table table-bordered table-hover my-5"
    >
      <thead className="table-primary">
        <tr>
          <th>Order ID</th>
          <th>Date</th>
          <th>User</th>
          <th>Total</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, index) => {
          return (
            <tr
              key={index}
              onDoubleClick={() => navigate(`/orders/${order.order_id}`)}
            >
              <td>{order.order_id}</td>
              <td>{order.order_date}</td>
              <td>{order.user_name}</td>
              <td>{(+order.total).toFixed(2)} MKD</td>
              <td>
                <Link
                  className="btn btn-outline-primary w-100"
                  to={`/orders/${order.order_id}`}
                >
                  Details
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <td
            style={{ fontSize: "34px" }}
            className="text-end fw-bold text-primary"
            colSpan={5}
          >
            Total:{" "}
            {orders
              .reduce((acc, item) => {
                return acc + +item.total;
              }, 0)
              .toFixed(2)}
            {" "} MKD
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

DataTableComponent.propTypes = {
  orders: PropTypes.array.isRequired,
};

export default DataTableComponent;
