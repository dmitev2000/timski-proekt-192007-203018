/* eslint-disable react-hooks/exhaustive-deps */
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import { API_BASE_URL } from "../../../shared/URLs";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../shared/AuthContext";

const DeviceBox = () => {
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const AuthCtx = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/phones/devices/count`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AuthCtx.user.token}`,
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
        border: "solid 2px lightblue",
      }}
    >
      {loading ? (
        <h4 style={{ color: "lightblue" }}>Loading...</h4>
      ) : (
        <>
          <div className="icon-wrapper icon-wrapper-device">
            <SmartphoneIcon fontSize="large" color="primary" />
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <p className="bigger fw-bold m-0">{total}</p>
            <p className="m-0 text-muted">Devices</p>
          </div>
        </>
      )}
    </div>
  );
};

export default DeviceBox;
