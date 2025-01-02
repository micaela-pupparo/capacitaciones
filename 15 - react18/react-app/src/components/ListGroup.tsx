function ListGroup() {
  const items = ["New York", "San Francisco", "Tokyo", "London", "Paris"];

  //   const message = items.length === 0 ? <p>No item found</p> : null;
  //   const getMessage = () => {
  //     return items.length === 0 ? <p>No item found</p> : null;
  //   };
  //   lo que tiene de bueno las funciones es que se le pueden pasar parametros y renderiza un mensaje distinto
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
        {items.map((item) => (
          <li className="list-group-item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
