/* eslint-disable react-hooks/exhaustive-deps */
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";
import FilterListIcon from "@mui/icons-material/FilterList";
import "../../../components/pages/admin/Dashboard.css";
import SearchBar from "./SearchBar";
import { Button, Tooltip } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import FilterRecentOrdersContext from "./FilterOrdersContext";
import axios from "axios";
import { API_BASE_URL } from "../../../shared/URLs";
import { AuthContext } from "../../../shared/AuthContext";
import LoupeIcon from "@mui/icons-material/Loupe";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../LoadingComponent";

const RecentOrders = () => {
  const AuthCtx = useContext(AuthContext);
  const FilterCtx = useContext(FilterRecentOrdersContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/orders/recent-orders`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AuthCtx.user.token}`,
        },
      })
      .then((res) => {
        //console.log(res.data);
        FilterCtx.updateOrders(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="recent-orders">
      <div className="recent-orders-header">
        <div className="d-flex gap-2 align-items-center">
          <SpeakerNotesIcon color="primary" />
          <h5 className="m-0">Recent orders</h5>
        </div>
        <div className="d-flex align-items-center gap-3">
          <Tooltip title="Filter by date">
            <FilterListIcon
              color="primary"
              onClick={() => {
                console.log("filtering");
              }}
            />
          </Tooltip>
          <SearchBar />
        </div>
      </div>
      {loading ? (
        <div className="d-flex justify-content-center mt-5">
          <LoadingComponent flag={true} />
        </div>
      ) : (
        <>
          {FilterCtx.ordersToShow.length > 0 ? (
            <table className="table table-borderless table-hover">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Datetime</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {FilterCtx.ordersToShow.map((order, index) => {
                  return (
                    <tr key={index}>
                      <td>{order.user_name}</td>
                      <td>
                        {new Date(order.order_date).toDateString()} -{" "}
                        {new Date(order.order_date)
                          .toTimeString()
                          .substring(0, 8)}
                      </td>
                      <td>{(+order.total).toFixed(2)} MKD</td>
                      <td className="text-end">
                        <Tooltip title="Open details" placement="top">
                          <Button
                            variant="outlined"
                            onClick={() => {
                              console.log(order.order_id);
                              navigate(`/orders/${order.order_id}`);
                            }}
                          >
                            <LoupeIcon />
                          </Button>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p>Nothing to show...</p>
          )}
        </>
      )}
    </div>
  );
};

export default RecentOrders;
