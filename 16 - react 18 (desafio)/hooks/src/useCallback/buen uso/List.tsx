import { useCallback, useState } from "react";
import ListItem from "./ListItem";

const List = () => {
  const [items, setItems] = useState(["Item 1", "Item 2", "Item 3"]);

  const handleDelete = useCallback((itemToRemove: string) => {
    setItems((prevItems) => prevItems.filter((item) => item !== itemToRemove));
  }, []);

  return (
    <ul>
      {items.map((item) => (
        <ListItem key={item} item={item} onDelete={handleDelete} />
      ))}
    </ul>
  );
};

export default List;
