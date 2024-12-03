# React

Es una libreria de JavaScript utilizada para construir interfaces de usuario rapidas e interactivas. El núcleo de React son los **componentes**, que son un pedazo de las interfaces. Los componentes son independientes y reutilizables. Se crean en aislamiento y luego se agrupan para crear toda la interfaz. Toda aplicación de React tiene al menos un componente llamado _componente raíz_, que representa toda la aplicación y contiene componentes hijos.

El componente usualmente es implementado como una clase de JavaScript con la siguiente estructura:

```js
class Tweet {
  state = {}; // datos que se van a mostrar cuando se ejecute el render
  render() {} // responsable de cómo el UI debería lucir, su output es un Elemento React (*)
}
```

(\*) Elemento React: es un objeto JavaScript que mapea un Elemento DOM. Solo representa ese elemento en memoria, no lo es realmente. Al Elemento React lo llamamos Virtual DOM. Cuando cambiamos el estado de un componente, obtenemos un Elmento React nuevo. React comparará este elemento y a sus hijos con el anterior, encontrará lo que cambió y luego actualizará parte del DOM Real para mantenerlo sincronizado con el DOM Virtual.

## Temas

### Archivo Introductorio - Counter

```js
/* eslint-disable @typescript-eslint/no-empty-object-type */
import * as React from "react";
// import { Component } from 'react';

interface CounterProps {}

interface CounterState {
  count: number;
  // imageUrl: string;
  tags: string[];
}

class Counter extends React.Component<CounterProps, CounterState> {
  state: CounterState = {
    count: 1,
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
    return this.setState({ count: this.state.count + 1 });
  };
  // luego se utiliza en el button
  // ------------------------------------------------------------------

  render() {
    return (
      <div>
        <span className={this.getBadgeClasses()}>{this.state.count}</span>
        <button
          onClick={() => this.handleIncrement({ id: 1 })} //aca estariamos pasando el producto que estamos renderando actualmente, no se deberia hardcodear el objeto
          className="btn btn-secondary btn-sm"
        >
          Increment
        </button>
        {/* otra forma de conditional rendering */}
        {this.state.tags.length === 0 && "Please create a new tag!"}{" "}
        {/* lo que va despues del && es lo que se renderea (*) */}
        {this.renderTags()}
      </div>
    );
  }

  private getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.state.count === 0 ? "warning" : "primary";
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
```

### Props vs State

Props incluye datos que le pasamos al componente, mientras que State contiene datos que son locales o privados del componente. Esto quiere decir que otros componentes no pueden acceder a los datos dentro de State.
Otra diferencia es que Props es readonly. No se pueden cambiar los datos de Props. Si se necesita modificar ese valor debemos crear una propiedad que lo contenga dentro de State.

```js
interface CounterProps {
  value: number;
}

interface CounterState {
  value: number;
}

class Counter extends React.Component<CounterProps, CounterState> {
  state = {
    value: this.props.value,
  };
}
```

### Lifecycle Hooks

Son metodos especiales que proporciona React para que los desarrolladores puedan ejecutar logica en momentos especificos del "ciclo de vida" de un componente o aplicacion. Estos momentos representan las distintas fases que atraviesa un componente desde que se crea hasta que se elimina del DOM.

#### Montaje (Mounting)

- constructor() -> se usa para inicializae el estado y enlazar metodos.
- render()
- componentDidMount() -> se ejecuta despues de que el componente se monta en el DOM. Ideal para hacer llamadas a APIs, incializar suscripciones o configurar eventos.

#### Actualizacion (Updating)

- render()
- shouldComponentUpdate(nextProps, nextState) -> controla si el componente debe actualizarse, util para optimizar el rendimiento.
- componentDidUpdate(prevProps, prevState) -> se ejecuta despues de actualizarse. Ideal para realizar efectos secundarios basados en los cambios de datos.

#### Desmontaje (Unmounting)

- componentWillUnmount() -> ideal para limpiar recursos como cancelar solicitudes, desactivar suscripciones o eliminar eventos.

#### Errores (Error Boundaries)

- componentDidCatch(error, info) -> permite manejar errores en componentes hijos.
