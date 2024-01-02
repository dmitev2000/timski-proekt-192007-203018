/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../shared/AuthContext";
import PaidIcon from "@mui/icons-material/Paid";
import { API_BASE_URL } from "../../../shared/URLs";
import axios from "axios";

const SalesBox = () => {
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const AuthCtx = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/admin/total-sales`, {
        headers: {
          Authorization: `Bearer ${AuthCtx.user.token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => setTotal(+res.data))
      .catch((err) => console.log(err))
      .finally(setLoading(false));
  }, []);

  return (
    <div
      className="dash-box"
      style={{
        border: "solid 2px lightsalmon",
      }}
    >
      {loading ? (
        <h4 style={{ color: "lightsalmon" }}>Loading...</h4>
      ) : (
        <>
          <div className="icon-wrapper icon-wrapper-sales">
            <PaidIcon fontSize="large" color="error" />
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <p className="bigger fw-bold m-0">{total.toFixed(2)} MKD</p>
            <p className="m-0 text-muted">Total Sales</p>
          </div>
        </>
      )}
    </div>
  );
};

export default SalesBox;
