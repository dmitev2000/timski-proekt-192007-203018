/* eslint-disable react-hooks/exhaustive-deps */
import PageBreadcrumbs from "../../layout/PageBreadcrumbs";
import ReloadDashboard from "../../ui/admin/ReloadDashboardContext";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { AuthContext } from "../../../shared/AuthContext";
import { useEffect, useState, useContext } from "react";
import { CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import UserTable from "../../ui/admin/UserTable";
import axios from "axios";
import { API_BASE_URL } from "../../../shared/URLs";
import { saveAs } from "file-saver";

const Accounts = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const AuthCtx = useContext(AuthContext);
  const DashCtx = useContext(ReloadDashboard);

  const links = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Accounts", path: "/admin/dashboard/accounts" },
  ];

  const ExportToCSV = () => {
    axios
      .get(`${API_BASE_URL}/admin/export/csv`, {
        headers: {
          Authorization: `Bearer ${AuthCtx.user.token}`,
        },
        responseType: "blob",
      })
      .then((res) => {
        const blob = new Blob([res.data], { type: "text/csv" });
        saveAs(blob, "exported.csv");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_BASE_URL}/admin/users`, {
        headers: {
          Authorization: `Bearer ${AuthCtx.user.token}`,
        },
      })
      .then((res) => {
        //console.log(res.data);
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [DashCtx.reloadUsers]);

  return (
    <div className="container px-5 py-4 my-5">
      <div className="pt-3 dashboard-page">
        <div className="my-4 d-flex justify-content-between align-items-center flex-wrap">
          <PageBreadcrumbs links={links} />
          <Button variant="outlined" onClick={ExportToCSV}>
            Export to CSV
            <CloudDownloadIcon sx={{ ml: 1 }} />
          </Button>
        </div>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "250px" }}
        >
          {loading ? (
            <CircularProgress size={30} />
          ) : (
            <div className="accounts">
              <UserTable
                users={users.filter((u) => u.role_name === "Customer")}
                title="Customers"
              />
              <UserTable
                users={users.filter((u) => u.role_name === "Seller")}
                title="Sellers"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Accounts;
