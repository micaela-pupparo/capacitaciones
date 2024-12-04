import React from "react";

interface ListGroupProps<T> {
  items: T[];
  textProperty: keyof T;
  valueProperty: keyof T;
}

const ListGroup = <T extends { [key: string]: React.ReactNode }>({
  items,
  textProperty,
  valueProperty,
}: ListGroupProps<T>): JSX.Element => {
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li key={String(item[valueProperty])} className="list-group-item">
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
