/* eslint-disable no-unused-vars */
import { createContext, useState } from "react";
import PropTypes from "prop-types";

const ReloadCart = createContext({
  reload: true,
  updateReload: () => {},
});

export const ReloadCartProvider = (props) => {
  const [reload, setReload] = useState(true);

  const updateReload = () => {
    setReload((prev) => !prev);
  };

  const context = {
    reload,
    updateReload,
  };

  return (
    <ReloadCart.Provider value={context}>{props.children}</ReloadCart.Provider>
  );
};

ReloadCartProvider.propTypes = {
  children: PropTypes.any.isRequired,
};

export default ReloadCart;
