import React from "react";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

const Table = (props) => {
  const { columns, sortColumn, onSort, data } = props;

  return (
    <table className="table">
      <TableHeader
        columns={columns}
        sortColumn={sortColumn}
        onSort={onSort}
      ></TableHeader>
      <TableBody data={data} columns={columns}></TableBody>
    </table>
  );
};

export default Table;
