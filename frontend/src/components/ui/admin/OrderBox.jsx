/* eslint-disable react-hooks/exhaustive-deps */
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../shared/AuthContext";
import { API_BASE_URL } from "../../../shared/URLs";
import axios from "axios";

const OrderBox = () => {
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const AuthCtx = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/admin/count-orders`, {
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
        border: "solid 2px gold",
      }}
    >
      {loading ? (
        <h4 style={{ color: "gold" }}>Loading...</h4>
      ) : (
        <>
          <div className="icon-wrapper icon-wrapper-orders">
            <SpeakerNotesIcon fontSize="large" color="warning" />
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <p className="bigger fw-bold m-0">{total}</p>
            <p className="m-0 text-muted">Orders</p>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderBox;
