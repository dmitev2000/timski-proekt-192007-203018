/* eslint-disable react-hooks/exhaustive-deps */
import { AuthContext } from "../../../shared/AuthContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../../shared/URLs";
import "./Dashboard.css";
import Button from "@mui/material/Button";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import DashBoxes from "../../ui/admin/DashBoxes";
import RecentOrders from "../../ui/admin/RecentOrders";
import PageBreadcrumbs from "../../layout/PageBreadcrumbs";
import { FilterRecentOrdersContextProvider } from "../../ui/admin/FilterOrdersContext";
import { saveAs } from "file-saver";
import axios from "axios";
import LoadingComponent from "../../ui/LoadingComponent";
import PageWrapper from "../../layout/PageWrapper";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const AuthCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const links = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/admin/dashboard" },
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
    if (!AuthCtx.user) {
      navigate("/login");
    }
    axios
      .get(`${API_BASE_URL}/auth/admin-role-id`)
      .then((res) => {
        if (+AuthCtx.user.user.role !== +res.data.role_id) {
          navigate("/unauthorized");
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <PageWrapper>
      <div className="px-4">
        <div>
          <div className="my-4 d-flex justify-content-between align-items-center flex-wrap">
            <PageBreadcrumbs links={links} />
            <Button variant="outlined" onClick={ExportToCSV}>
              Export to CSV
              <CloudDownloadIcon sx={{ ml: 1 }} />
            </Button>
          </div>
          <DashBoxes />
          <FilterRecentOrdersContextProvider>
            <RecentOrders />
          </FilterRecentOrdersContextProvider>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Dashboard;
