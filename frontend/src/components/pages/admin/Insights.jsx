import PageBreadcrumbs from "../../layout/PageBreadcrumbs";
import PageWrapper from "../../layout/PageWrapper";
import AreaChartElement from "./charts/AreaChartElement";
import RadialBarChartElement from "./charts/RadialBarChartElement";


const Insights = () => {
  const links = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Insights", path: "/admin/dashboard/insights" },
  ];

  // TODO: Get data from api and replace the example data

  return (
    <PageWrapper>
      <div className="mx-4">
        <PageBreadcrumbs links={links} />
        <div className="d-flex justify-content-center align-items-center flex-column gap-5 py-5">
          <AreaChartElement />
          <RadialBarChartElement />
        </div>
      </div>
    </PageWrapper>
  );
};

export default Insights;
