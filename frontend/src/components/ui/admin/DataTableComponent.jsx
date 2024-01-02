import { useEffect, useRef } from "react";
import DataTable from "datatables.net-dt";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const DataTableComponent = ({ orders }) => {
  const tableRef = useRef(null);

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
    <table id="table" className="table table-bordered table-striped my-5">
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
            <tr key={index}>
              <td>{order.order_id}</td>
              <td>{order.order_date}</td>
              <td>{order.user_name}</td>
              <td>{(+order.total).toFixed(2)} MKD</td>
              <td>
                <Link to={`/orders/${order.order_id}`}>Details</Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

DataTableComponent.propTypes = {
  orders: PropTypes.array.isRequired,
};

export default DataTableComponent;
