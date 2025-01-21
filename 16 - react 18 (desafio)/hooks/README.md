# Hooks

Los Hooks son funciones que te permiten enganchar el estado de React y el ciclo de vida desde componentes de función.

## useActionState

Es un hook que permite gestionar el estado de un formulario basado en el resultado de una acción de formulario. Facilita la actualización del estado cuando se invoca una acción, simplificando la gestión de formularios en componentes funcionales.

### Sintaxis básica

```js
const [state, formAction, isPending] = useActionState(actionFunction, initialState, permalink?);
```

- state: estado actual del formulario. Inicialmente concide con initialState y se actualiza con el valor retornado por actionFunction tras la sumisión del formulario.
- formAction: función que se pasa al atributo action del formulario o al atributo formAction de un botón dentro del formulario.
- isPending: booleano que indica si hay una transición pendiente.
- actionFunction: función que se ejecuta al enviar el formulario. Recibe dos parámetros:
  - previousState: estado previo del formulario.
  - formData: objeto FormData que contiene los datos del formulario enviados.
- initialState: valor inicial del estao del formulario y puede ser cualquier valor serializable (proceso mediante el cual un objeto o estructura de datos se traduce a un formato adecuado para su transferencia a través de una red o almacenamiento).

### Conceptos utilizados en los ejemplos

#### Formulario

El elemento `<form>` define cómo se enviarán los datos. Todos sus atributos están diseñados para que pueda configurar la solicitud que se enviará cuando un usuario pulsa un botón de envío. Los dos atributos más importantes son action y method.

##### Action

Define el lugar donde los datos se envían. Su valor debe ser una dirección URL válida. Si no se proporciona este atributo, los datos serán enviados a la dirección URL de la página que contiene el formulario. Podemos utilizar una dirección URL absoluta `"htpp://foo.com"` o una relativa.

## useCallback

El hook useCallback de React se utiliza para memorizar funciones, devolviendo una versión memoizada de la función que solo cambia si las dependencias proporcionadas cambian. Su propósito principal es optimizar el rendimiento evitando la recreación innecesaria de funciones, lo que puede ser útil en situaciones como:

- Paso de funciones a componentes hijos para evitar re-renderizados innecesarios.
- Uso en dependencias de efectos (useEffect) para prevenir efectos colaterales no deseados.
- Optimización en listas donde cada elemento recibe una función como prop.

### Sintaxis básica

```js
const memoizedCallback = useCallback(callbackFunction, [dependencies]);
```

- callbackFunction: La función que se va a memorizar.
- dependencies: Un array de dependencias que determina cuándo se debe actualizar la función.

### Conceptos utilizados en los ejemplos

#### React.memo

Es una función de orden superior (higher-order component) -toma una o mas funciones como argumentos y/o retorna una funcion como resultado- en React que puede mejorar el rendimiento de tu aplicación al evitar renderizados innecesarios de componentes. Hace una memoización del componente, lo que significa que React recordará el último resultado del renderizado y lo reutilizará si las props no han cambiado.

¿Cuándo usarlo?

- Con componentes funcionales puros (que siempre renderizan lo mismo con las mismas props)
- En componentes que se renderizan frecuentemente
- Cuando las props no cambian a menudo

## useContext

El hook useContext permite acceder al valor de un contexto de React en cualquier parte del árbol de componentes sin necesidad de prop drilling (pasar props manualmente a través de múltiples niveles de componentes).

Se utiliza para compartir datos globales, como temas de UI, autenticación, configuración de usuario, entre otros.

### Sintaxis básica

1. Se crea un contexto con React.createContext

```js
const ThemeContext = createContext("light");
```

2. Se provee el valor del contexto utilizando el componente `<Context.Provider>`

```js
<ThemeContext.Provider> <ChildComponent> <ThemeContext.Provider>
```

3. Se accede al valor en cualquier componente descendiente usando useContext

```js
const theme = useContext(ThemeContext);
```

### Errores comunes

- Si un estado solo se necesita en algunos componentes, es mejor plantearse el uso de useState y props
- Se debe evitar modificar el contexto directamente desde componentes secundarios

### Cuándo usarlo y cuándo no

#### Usalo si...

- Se necesita compartir datos globales como tema o usuario
- Se quiere evitar prop drilling en estructuras profundas
- Los valores cambian poco frecuentemente

#### No lo uses si...

- Los datos solo son relevantes en pocos componentes
- El estado es de naturaleza local y simple
- El estado cambia constantemente y causa renders
