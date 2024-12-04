import React from "react";
import SortColumn from "../../types/sortColumnType";

interface TableHeaderProps {
  columns: { path?: string; label?: string; key?: string }[];
  sortColumn: SortColumn;
  onSort: (sortColumn: SortColumn) => void;
}

class TableHeader extends React.Component<TableHeaderProps, object> {
  raiseSort = (path: string) => {
    const sortColumn = { ...this.props.sortColumn };
    console.log(sortColumn);
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };
  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
