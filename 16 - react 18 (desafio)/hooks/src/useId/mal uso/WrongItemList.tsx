import { useId } from "react";

const WrongItemList = ({ items }: { items: string[] }) => {
  return (
    <ul>
      {items.map((item) => {
        const id = useId();
        return <li key={id}>{item}</li>;
      })}
    </ul>
  );
};

export default WrongItemList;

// id no persistente, se generan nuevos ids en cada render
// react necesita claves estables basadas en datos, no en identificadores generados en cada renderizado
