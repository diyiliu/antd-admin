import React from "react";

import TablePage from "./TablePage";
import { TableProvider } from "./tableContext";

const TableContainer = (props) => {

  return (
    <TableProvider>
      <TablePage {...props} />
    </TableProvider>
  );
};

export default TableContainer;
