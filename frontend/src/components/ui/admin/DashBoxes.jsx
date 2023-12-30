import DeviceBox from "./DeviceBox";
import SalesBox from "./SalesBox";
import OrderBox from "./OrderBox";
import UserBox from "./UserBox";
import "../../../components/pages/admin/Dashboard.css";

const DashBoxes = () => {
  return (
    <div className="dash-boxes-wrapper gap-5 flex-wrap my-5">
      <DeviceBox />
      <UserBox />
      <OrderBox />
      <SalesBox />
    </div>
  );
};

export default DashBoxes;
