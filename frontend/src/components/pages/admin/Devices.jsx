import PageBreadcrumbs from "../../layout/PageBreadcrumbs";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddNewDeviceToDb from "../../ui/admin/AddNewDeviceToDb";
import PageWrapper from "../../layout/PageWrapper";

const Devices = () => {
  const navigate = useNavigate();
  const links = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Devices", path: "/admin/dashboard/devices" },
  ];
  return (
    <PageWrapper>
      <div className="px-4">
        <div className="pt-4 pb-5 px-4 d-flex justify-content-between align-items-center">
          <PageBreadcrumbs links={links} />
          <Button variant="outlined" onClick={() => navigate("/products")}>
            Catalogue
          </Button>
        </div>
        <div className="px-4">
          <AddNewDeviceToDb />
        </div>
      </div>
    </PageWrapper>
  );
};

export default Devices;
