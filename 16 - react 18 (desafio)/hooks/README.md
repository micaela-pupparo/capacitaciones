# Hooks

Los Hooks son funciones que te permiten enganchar el estado de React y el ciclo de vida desde componentes de función.

## useActionState

Es un hook que permite gestionar el estado de un formulario basado en el resultado de una acción de formulario. Facilita la actualización del estado cuando se invoca una acción, simplificando la gestión de formularios en componentes funcionales.

### Formulario

El elemento `<form>` define cómo se enviarán los datos. Todos sus atributos están diseñados para que pueda configurar la solicitud que se enviará cuando un usuario pulsa un botón de envío. Los dos atributos más importantes son action y method.

#### Action

Define el lugar donde los datos se envían. Su valor debe ser una dirección URL válida. Si no se proporciona este atributo, los datos serán enviados a la dirección URL de la página que contiene el formulario. Podemos utilizar una dirección URL absoluta `"htpp://foo.com"` o una relativa.

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
