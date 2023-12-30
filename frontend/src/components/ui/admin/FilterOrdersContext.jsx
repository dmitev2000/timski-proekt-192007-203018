/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const FilterRecentOrdersContext = createContext({
  orders: [],
  ordersToShow: [],
  filterUserValue: "",
  updateFilterValue: () => {},
  filterOrdersByUser: () => {},
  updateOrders: () => {},
});

export const FilterRecentOrdersContextProvider = (props) => {
  const [orders, setOrders] = useState([]);
  const [ordersToShow, setOrdersToShow] = useState([]);
  const [filterUserValue, setFilterUserValue] = useState("");

  useEffect(() => {
    filterOrdersByUser();
  }, [filterUserValue]);

  const updateOrders = (orders) => {
    setOrders(() => orders);
    setOrdersToShow(() => orders);
  };

  const updateFilterValue = (value) => {
    setFilterUserValue(() => value);
  };

  const filterOrdersByUser = () => {
    setOrdersToShow(() =>
      orders.filter((order) => {
        return order.user_name
          .toLowerCase()
          .includes(filterUserValue.toLowerCase());
      })
    );
  };

  const context = {
    orders,
    ordersToShow,
    filterUserValue,
    updateFilterValue,
    filterOrdersByUser,
    updateOrders,
  };

  return (
    <FilterRecentOrdersContext.Provider value={context}>
      {props.children}
    </FilterRecentOrdersContext.Provider>
  );
};

FilterRecentOrdersContextProvider.propTypes = {
  children: PropTypes.any.isRequired,
};

export default FilterRecentOrdersContext;
