import { useDeferredValue, useState } from "react";

const FilteredLists = ({ items }: { items: string[] }) => {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  // se podria usar useMemo
  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(deferredQuery.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar..."
      />
      <ul>
        {filteredItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default FilteredLists;

// la busqueda y el filtrado solo se actualizan despues de que react completa tareas mas urgentes
// el usuario no experimenta bloqueos al escribir en el campo de entrada
