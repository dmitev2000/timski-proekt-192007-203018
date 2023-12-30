import { createContext, useState } from "react";
import PropTypes from "prop-types";

const ReloadDashboard = createContext({
  reloadUsers: true,
  updateReloadUsers: () => {},
});

export const ReloadDashboardProvider = (props) => {
  const [reloadUsers, setReloadUsers] = useState(true);

  const updateReloadUsers = () => {
    setReloadUsers((prev) => !prev);
  };

  const context = {
    reloadUsers,
    updateReloadUsers,
  };

  return (
    <ReloadDashboard.Provider value={context}>
      {props.children}
    </ReloadDashboard.Provider>
  );
};

ReloadDashboardProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ReloadDashboard;
