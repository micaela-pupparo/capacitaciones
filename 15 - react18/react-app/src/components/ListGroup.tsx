import { MouseEvent } from "react";

function ListGroup() {
  const items = ["New York", "San Francisco", "Tokyo", "London", "Paris"];

  //   const message = items.length === 0 ? <p>No item found</p> : null;
  //   const getMessage = () => {
  //     return items.length === 0 ? <p>No item found</p> : null;
  //   };
  //   lo que tiene de bueno las funciones es que se le pueden pasar parametros y renderiza un mensaje distinto

  const handleClick = (event: MouseEvent) => console.log(event);
  return (
    <>
      <h1>List</h1>
      {items.length === 0 && <p>No item found</p>}
      {/* otras formas
        {message}
        {getMessage()}
        {items.length === 0 ? <p>No item found</p> : null}
      */}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            className="list-group-item"
            key={item}
            onClick={(e) => console.log(item, index, e)}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
