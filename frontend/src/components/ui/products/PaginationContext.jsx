/* eslint-disable no-unused-vars */
import { createContext, useState } from "react";
import PropTypes from "prop-types";

const PaginationContext = createContext({
  currentPage: 1,
  totalLength: 0,
  perPage: 4,
  updateCurrentPage: (value) => {},
  updateTotalLength: (value) => {},
  updatePerPage: (value) => {},
});

export const PaginationContextProvider = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalLength, setTotalLength] = useState(0);
  const [perPage, setPerPage] = useState(4);

  const updateCurrentPage = (value) => {
    setCurrentPage(() => value);
  };

  const updateTotalLength = (value) => {
    setTotalLength(() => value);
  };

  const updatePerPage = (value) => {
    setPerPage(() => value);
    setCurrentPage(() => 1);
  };

  const context = {
    currentPage,
    totalLength,
    perPage,
    updateCurrentPage,
    updateTotalLength,
    updatePerPage,
  };

  return (
    <PaginationContext.Provider value={context}>
      {props.children}
    </PaginationContext.Provider>
  );
};

PaginationContextProvider.propTypes = {
  children: PropTypes.any.isRequired,
};

export default PaginationContext;
