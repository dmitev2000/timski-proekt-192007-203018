/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import PageBreadcrumbs from "../../layout/PageBreadcrumbs";
import PageWrapper from "../../layout/PageWrapper";
import AreaChartElement from "../../ui/admin/charts/AreaChartElement";
// import RadialBarChartElement from "../../ui/admin/charts/RadialBarChartElement";
import axios from "axios";
import { API_BASE_URL } from "../../../shared/URLs";
import { AuthContext } from "../../../shared/AuthContext";
import LoadingComponent from "../../ui/LoadingComponent";

const Insights = () => {
  const AuthCtx = useContext(AuthContext);
  const [weekSales, setWeekSales] = useState([]);
  const [loading, setLoading] = useState(true);

  const links = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Insights", path: "/admin/dashboard/insights" },
  ];

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/admin/get/week-stats`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AuthCtx.user.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setWeekSales(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <PageWrapper>
      <div className="mx-4 py-4">
        <PageBreadcrumbs links={links} />
        <div className="d-flex justify-content-center align-items-center flex-column gap-5 py-5">
          <AreaChartElement weekSales={weekSales} />
          {/* <RadialBarChartElement /> */}
        </div>
      </div>
    </PageWrapper>
  );
};

export default Insights;
