/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../shared/AuthContext";
import GroupIcon from "@mui/icons-material/Group";
import { API_BASE_URL } from "../../../shared/URLs";
import axios from "axios";

const UserBox = () => {
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const AuthCtx = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/admin/customers`, {
        headers: {
          Authorization: `Bearer ${AuthCtx.user.token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => setTotal(+res.data.length))
      .catch((err) => console.log(err))
      .finally(setLoading(false));
  }, []);

  return (
    <div
      className="dash-box"
      style={{
        border: "solid 2px lightpink",
      }}
    >
      {loading ? (
        <h4 style={{ color: "lightpink" }}>Loading...</h4>
      ) : (
        <>
          <div className="icon-wrapper icon-wrapper-users">
            <GroupIcon fontSize="large" color="secondary" />
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <p className="bigger fw-bold m-0">{total}</p>
            <p className="m-0 text-muted">Customers</p>
          </div>
        </>
      )}
    </div>
  );
};

export default UserBox;
