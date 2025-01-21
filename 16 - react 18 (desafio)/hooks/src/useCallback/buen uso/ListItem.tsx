import React from "react";

interface Props {
  item: string;
  onDelete: (item: string) => void;
}

const ListItem = React.memo(({ item, onDelete }: Props) => {
  return (
    <li>
      {item} <button onClick={() => onDelete(item)}>Eliminar</button>
    </li>
  );
});

export default ListItem;
