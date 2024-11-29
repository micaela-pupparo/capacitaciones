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
