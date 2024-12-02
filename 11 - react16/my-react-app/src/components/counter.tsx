/* eslint-disable @typescript-eslint/no-empty-object-type */
import * as React from "react";
// import { Component } from 'react';

interface CounterProps {
  counter: { id: number; value: number };
  onDelete: (counterId: number) => void;
  // value: number;
  // selected: boolean;
  // id: number; es al pedo pasar por separado todas las propiedades, mejor pasar directamente el objeto counter
  //children?: React.ReactNode; //para pasarle children
}

interface CounterState {
  value: number;
  // imageUrl: string;
  tags: string[];
}

class Counter extends React.Component<CounterProps, CounterState> {
  state: CounterState = {
    value: this.props.counter.value,
    // imageUrl: "https://picsum.photos/200",
    tags: ["tag1", "tag2", "tag3"],
  };

  // conditional rendering --------------------------------------------
  renderTags() {
    if (this.state.tags.length === 0) return <p>There are no tags!</p>;

    return (
      <ul>
        {this.state.tags.map((tag) => (
          <li key={tag}>{tag}</li> //cada tag deberia tener una llave unica para que react sepa que es lo que cambio
        ))}
      </ul>
    );
  }
  // ------------------------------------------------------------------

  // handling events --------------------------------------------------
  handleIncrement = (product: unknown) => {
    console.log(product);
    return this.setState({ value: this.state.value + 1 });
  };
  // luego se utiliza en el button
  // ------------------------------------------------------------------

  render() {
    return (
      <div>
        <h4>Counter #{this.props.counter.id}</h4>
        <span className={this.getBadgeClasses()}>{this.state.value}</span>
        <button
          onClick={() => this.handleIncrement({ id: 1 })} //aca estariamos pasando el producto que estamos renderando actualmente, no se deberia hardcodear el objeto
          className="btn btn-secondary btn-sm"
        >
          Increment
        </button>
        <button
          // esto se le llama raising an event
          onClick={() => this.props.onDelete(this.props.counter.id)}
          className="btn btn-danger btn-sm m-2"
        >
          Delete
        </button>
        {/* otra forma de conditional rendering
        {this.state.tags.length === 0 && "Please create a new tag!"}{" "}
        {/* lo que va despues del && es lo que se renderea (*) */}
        {/* {this.renderTags()} */}
      </div>
    );
  }
  handleDelete(): void {
    throw new Error("Method not implemented.");
  }

  getBadgeClasses() {
    let classes = "badge m-2 bg-";
    classes += this.state.value === 0 ? "warning" : "primary";
    return classes;
  }
}

// <React.Fragment></React.Fragment> se usa para no tener que usar el div

// para poner clases se usa className porque las expresiones tsx (<h1></h1> por ejemplo)
// se compilan a elementos de React, que son esencialmente texto plano de typescript
// no se puede usar class porque es una palabra reservada en typescript

// para agregarle estilos a las expresiones tsx style={{ fontSize: 30 }}

// (*) explicacion de otra forma de conditional rendering
// true && false -> false
// true && 'Hi -> 'Hi' (como uno es true y el otro es truthy, devuelve el ultimo elemento)
// true && 'Hi' && 1 -> 1

// que pasa cuando el estado cambia?
// cuando apretamos el boton incrementar, se llama al metodo setState
// este metodo le avisa a react que el componente va a cambiar.
// react va a programar una llamada al metodo render, pero no sabemos cuando
// (es una llamada asincrona). el metodo render devuelve un nuevo elemnto React
// nuestro Virtual DOM se ve como un arbol del siguiente tipo:
//        div
// span         button
// cuando cambia el estamo, React agarra este Virtual DOM y compara el nuevo con el viejo
// para saber que elementos en el Virtual DOM estan modificados.
// en este caso ve que el elemento span es el que cambia porque llama a la propiedad
// this.state.count
// asi que agarrara al DOM real y actualizara el span correspondiente para que
// matchee el que tenemos en el DOM Virtual
// SOLO se actualiza el span, nada mas.

export default Counter;
