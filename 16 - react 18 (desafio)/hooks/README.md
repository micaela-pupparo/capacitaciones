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

## useDebugValue

Es una herramienta de depuración que permite proporcionar etiquetas descriptivas a valores dentro de hooks personalizados. Estas etiquetas se muestran en las herramientas de desarrollo de React (React DevTools), facilitando la inspección del estado interno de los hooks.

### Sintaxis básica

```js
function useCustomHook(value) {
  useDebugValue(value ? "Activo" : "Inactivo");
  return value;
}

function App() {
  const isActive = useCustomHook(true);
}
```

Puede tener un segundo parámetro:

```js
useDebugValue(value, format?)
```

Es una función formateadora. Cuando un componente es inspeccionado, React DevTools llamará a esta función con el value como parámetro, y luego mostrará el valor formateado retornado. Si no se especifica, el value original será mostrado.

```js
useDebugValue(date, (date) => date.toDateString());
```

### Cuándo usarlo y cuándo no

#### Usalo si...

- Se crea un hook personalizado para encapsular logica
- Se requiere mejorar la depuración en herramientas de React
- Se manejan valores complejos dentro del hook

#### No lo uses si...

- Se esta dentro de un componente funcional
- El valor del estado es facilmente visible sin ayuda
- El hook es muy simple o no es compartido ampliamente

## useDeferredValue

Permite diferir la actualización de un valor hasta que el navegador esté en estado inactivo. Esto es útil para mantener la interfaz de usuario (UI) receptiva al priorizar actualizaciones urgentes, como la entrada del usuario, sobre otras menos críticas.

### Sintaxis básica

```js
const deferredValue = useDeferredValue(value, initialValue?)
```

- value: el valor que queres diferir. Puede tener cualquier tipo.
- initialValue: un valor para usar en el renderizado inicial de un componente.

### Cuándo usarlo y cuándo no

#### Usalo si...

- Se maneja un valor que desencadena renders costosos
- Se desea optimizar la experiencia del usuario en cambios rápidos
- Hay operaciones de búsqueda, filtrado o cálculos pesados

#### No lo uses si...

- El valor es simple y no afecta el rendimiento
- No hay tareas urgentes que compitan por recursos
- Los cálculos o renders son triviales y rápidos

## useEffect

Permite ejecutar efectos secundarios en componentes funcionales de React. Se ejecuta después del renderizado del componente y puede configurarse para ejecutarse en diferentes momentos según las dependencias definidas.

Los efectos secundarios pueden incluir:

- Llamadas a APIs (fetching de datos)
- Manipulación del DOM (event listeners, timers)
- Subscripciones a servicios (WebSockets, Firebase)
- Sincronización con sistemas externos

### Sintaxis básica

```js
useEffect(setup, dependecies?)
```

Si no hay dependencias especificadas, se volverá a ejecutar la función luego de cada renderizado.

### Cuándo usarlo y cuándo no

#### Usalo si...

- Se necesita ejecutar código en montaje o desmontaje
- Se deben realizar peticiones a APIs o subscripciones
- Se necesitan actualizaciones sincronizadas con efectos

#### No lo uses si...

- Se pueden manejar cambios directamente en eventos
- Se trata de calcular valores derivados del estado
- La lógica puede ejecutarse directamente en el render

## useId

Se utiliza para generar identificadores únicos y estables para elementos en la interfaz de usuario. Pueden ser pasados mediante atributos de acceibilidad. No deberia ser utilizado para generar keys en una lista.

### Sintaxis básica

```js
useId();
```

Retorna un ID unico en string.

### Cuándo usarlo y cuándo no

#### Usalo si...

- Se necesitan identificadores únicos en formularios
- Se crean múltiples instancias de componentes dinámicos

#### No lo uses si...

- Se quiere usar como clave de lista en .map()
- Los identificadores están disponibles en los datos
- Los elementos son estáticos y no requieren IDs únicos

## useImperativeHandle

Permite personalizar la instancia de un componente hijo cuando es accedido desde un componente padre mediante una referencia (ref). Se utiliza principalmente para exponer métodos o propiedades específicas del componente hijo al componente padre, sin revelar toda su implementación interna.

Este hook es útil en escenarios donde:

- Se necesita un control más explícito del comportamiento de un componente desde el padre.
- Se requieren funciones o propiedades específicas para interactuar con el componente hijo.
- Se integra con bibliotecas de terceros que dependen de referencias de React.

Con React 19, ref está disponible como prop. Antes para acceder a ref era necesario el uso de forwardRef

### Sintaxis básica

```js
useImperativeHandle(ref, createHandle, dependencies?)
```

- ref: la referencia que se recibe como prop.
- createHandle: una funcion sin argumentos que retorna el ref handle que queremos exponer. Usualmente se retorna un objeto con los metodos que queremos exponer
- dependencies: listado de todos los valores reactivos referenciados dentro de createHandle. Estos incluyen props, state y todas las variables o funciones declaradas directamente dentro del body del componente

### Cuándo usarlo y cuándo no

#### Usalo si...

- Necesitas exponer funcionalidades específicas de un componente hijo al padre. Por ejemplo:
  - Métodos como focus, scrollTo o clear.
  - Acceso controlado a propiedades o métodos del componente.

#### No lo uses si...

- No necesitas que el componente padre interactúe directamente con métodos o propiedades del componente hijo.
- Podes lograr la misma funcionalidad pasando callbacks o manejadores de eventos a través de props.

## useInsertionEffect

Es un hook especializado que se ejecuta sincronizadamente antes de que las mutaciones del DOM sean realizadas. Se utiliza principalmente para insertar estilos, elementos o realizar tareas que requieren ser completadas antes de que el navegador dibuje la UI. Este hook es para los autores de la librería CSS-in-JS. Si no lo estás utilizando, es mejor usar useEffect o useLayoutEffect.

### Sintaxis básica

```js
useInsertionEffect(setup, dependencies?)
```

- setup: funcion con la logica de Effect. Puede retornar una funcion limpiadora. Cuando el componente sea agregado al DOM, pero antes de que los layout Effect se ejecuten, React ejecutara la funcion setup. Luego de cada re-renderizado con las dependencias cambiadas (si las pusiste), React primero ejecutara la funcion limpiadora con los valores antiguos, y luego ejecutara la funcion setup con los nuevos valores. Cuando el componente es removido del DOM, React ejecutara la funcion limpiadora.
- dependencias: listado de valores reactivos referenciados dentro del codigo de setup.

### Cuándo usarlo y cuándo no

#### Usalo si...

- Estás utilizando CSS-in-JS y necesitas insertar estilos dinámicos antes de que el navegador renderice el contenido o cuando necesitas realizar modificaciones que afectan directamente el layout y requieren completarse antes del render.

#### No lo uses si...

- No estás usando CSS-in-JS

## useLayoutEffect

Se ejecuta sincronizadamente después de que React haya realizado las mutaciones del DOM, pero antes de que el navegador pinte la pantalla. Esto permite realizar ajustes inmediatos en el DOM o medirlo antes de que sea visible para el usuario.

Es ideal para tareas que requieren realizar cálculos basados en el layout actual o para evitar parpadeos visuales.

**Nota:** useLayoutEffect puede dañar la performance. Se prefiere el uso de useEffect.

### Sintaxis básica

```js
useLayoutEffect(setup, dependencies?)
```

### Cuándo usarlo y cuándo no

#### Usalo si...

- Necesitas medir tu layout/pantalla antes de que el navegador pinte la pantalla. Por ejemplo: tenemos un tooltip que aparece al lado de un elemento cuando se hace hover. Si hay suficiente espacio, el tooltip deberia aparecer arriba del elemento, pero si no entra, deberia aparecer debajo. Para lograr esto, necesitamos saber su altura. O sea, primero se renderiza el tooltip en cualquier lado, luego se mide su altura y decidimos en dónde colocarlo y, por último, renderizamos de nuevo el tooltip pero en la posición correcta. Todo esto debe pasar antes de que la pantalla se pinte.
- Necesitas realizar cambios inmediatos en el DOM después de que React lo haya actualizado. Ejemplo: Cambiar estilos, desplazamiento, o posiciones que dependen del tamaño del elemento.
- Cuando debes evitar parpadeos visuales. Ejemplo: Ajustar dinámicamente el tamaño o la posición de un elemento.

#### No lo uses si...

- Tenes que realizar tareas que no afectan directamente el layout del DOM. Para eso está useEffect.
- Tenes que hacer operaciones pesadas. El uso de useLayoutEffect bloquea el render hasta que se complete, lo que puede afectar el rendimiento si haces cálculos costosos.
- La lógica puede manejarse de manera asíncrona. Por ejemplo, actualizar estados o manejar eventos.

### Conceptos utilizados en los ejemplos

#### createPortal

Permite renderizar elementos o hijos en una parte diferente del DOM. El portal permite que algunos de los hijos de un componente, por ejemplo, sean renderizados en un lugar diferente del DOM. Esto permite que algunos elementos "escapen" del contenedor en el que estan.

```js
<div>
  <SomeComponent />
  {createPortal(children, domNode, key?)}
</div>
```

- children: lo que sea que pueda ser renderizado con React, como JSX, un Fragment, un string, un numero, un array de estos.
- domNode: cualquier nodo del DOM, como los retornados por document.getElementById(). El nodo debe de existir previamente. Si le pasas un nodo del DOM distinto durante una actualizacion causara que el contenido del portar sea creado de nuevo.
- key: un string o numero unico para ser usado como la key del portal.

## useMemo

Permite memorizar valores calculados para evitar realizar cálculos costosos en cada render. Solo vuelve a calcular el valor cuando cambian las dependencias especificadas.

Es útil para optimizar el rendimiento de componentes, especialmente cuando:

1. Realizas cálculos intensivos.
2. Trabajas con listas filtradas o transformadas que no necesitan actualizarse constantemente.

### Sintaxis básica

```js
const cachedValue = useMemo(calculateValue, dependencies);
```

- calculateValue: funcion que calcula el valor que queres cachear. Deberia ser pura, no tomar argumento y retornar un valor de cualquier tipo. React llamara a la funcion durante el renderizado inicial. En los otros renderizados, retornara el mismo valor si las dependencias no cambian.
- dependencies: listado de todos los valores reactivos referenciados dentro de calculateValue.

### Cuándo usarlo y cuándo no

#### Usalo si...

- Querés optimizar cálculos intensivos que no necesitan ejecutarse en cada render.
- Trabajas con listas filtradas o transformadas que dependen de datos específicos.
- El rendimiento es crítico, especialmente en componentes que se renderizan con frecuencia.

#### No lo uses si...

- Los cálculos son triviales y no afectan significativamente el rendimiento.
- El cálculo no depende de datos dinámicos.
- Querés evitar re-renders.
  - Usa React.memo en su lugar si necesitas evitar renders innecesarios de componentes.

### Diferencia React.memo y useMemo

#### React.memo

Es una función de orden superior que se usa para memorizar un componente completo. Sirve para evitar que un componente funcional se vuelva a renderizar si sus props no cambian.

Se utiliza cuando:

- Queres evitar renders innecesarios de un componente funcional si sus props no cambian.
- Ideal para componentes que reciben props puras, ya que compara automáticamente las props usando una comparación superficial (===).

#### useMemo

Es un hook que se utiliza para memorizar valores calculados, como resultados de funciones costosas o transformaciones de datos. Esto evita que esos cálculos se ejecuten en cada render si las dependencias no han cambiado.

Se utiliza cuando:

- Tenes cálculos intensivos (procesamiento de datos grandes -filtrar, mapear o reducir una lista-, calculos matematicos complejos, renderizado de grafico o visualizaciones, operaciones de transformacion o normalizacion de datos, operaciones con fechas o tiempos) que afectan el rendimiento.
- Necesitas transformar listas o realizar operaciones complejas dentro del render.

## useOptimistic

Se utiliza para gestionar actualizaciones optimistas en el estado de tu aplicación. Permite que el usuario vea inmediatamente un cambio en la UI antes de que una operación asíncrona (como una solicitud HTTP) se complete.

### Sintaxis básica

```js
const [optimisticState, addOptimistic] = useOptimistic(state, updateFn);
```

- state: valor a retornar inicialmente meintras ninguna accion este pendiente.
- updateFn(currentState, optimisticValue): funcion que toma el estado inicial y el valor optimista pasado en addOptimistic y retorna el resultado del estado optimista.

### Cuándo usarlo y cuándo no

#### Usalo si...

- Necesitas actualizaciones rápidas en la UI para mejorar la experiencia del usuario, como:
  - Listas de tareas (marcar como completado).
  - Actualizaciones en tiempo real (likes, votos, comentarios).
  - Formularios (mostrar cambios inmediatamente mientras se guardan).
- En operaciones de red: Donde la latencia puede ser perceptible.

#### No lo uses si...

- No podes revertir el cambio fácilmente. Ejemplo: Borrar un elemento sin confirmación puede ser problemático si falla la operación.
- Los datos de la operación dependen del servidor. Si necesitas una respuesta específica del servidor para calcular el estado final, useOptimistic no es ideal.

## useReducer

Es una alternativa a useState que se utiliza cuando el estado de un componente tiene lógica compleja o múltiples subvalores que dependen entre sí. Este hook implementa un patrón similar al de un reducer en Redux, donde un estado inicial es modificado por acciones para producir un nuevo estado.

### Sintaxis básica

```js
const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case "ACTION_TYPE":
      return { ...state, value: action.payload };
    default:
      return state;
  }
};

const Component: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialArg);

  return <div>{state.value}</div>;
};
```

- reducer: especifica cómo el estado es actualizado. Debe ser puro, tomar el estado y la acción como parámetros y debería retornar el siguiente estado.
- initialArg: valor con el cual el estado inicial es calculado.
- init?: la función inicializadora debe retornar el estado inicial. Si no se especifica, el estado inicial es seteado en initialArg. Caso contrario, el estado inicial es seteado al resultado del llamado de init(initialArg)

### Cuándo usarlo y cuándo no

#### Usalo si...

- El estado tiene múltiples campos o es complejo. Ejemplo: Formularios con varios inputs relacionados.
- Hay lógica de actualización compleja. Ejemplo: Estados que dependen de múltiples condiciones o acciones.
- Queres organizar y centralizar la lógica del estado.

#### No lo uses si...

- El estado es simple.

### Comparación con useState

Nota: se puede utilizar ambos en un mismo componente.

#### useState

- Ideal para estados simples.
- Menos escalable con múltiples valores.
- Fácil de usar para casos simples.
- Menos código a escribir.
- Más fácil de leer cuando los estados son simples.
- Ejemplo típico: contador o toggle.

#### useReducer

- Mejor para estados complejos o relacionados.
- Escalable gracias a acciones centralizadas.
- Requiere configurar reducer y acciones.
- Más fácl de debuggear (tenés que hacer console.log solo en el reducer para chequear que cada acción esté bien).
- Ejemplo típico: formularios o lógica con múltiples pasos.

## useRef

Se utiliza para:

- Acceder a elementos DOM directamente. Te permite interactuar con elementos HTML sin usar document.querySelector.
- Guardar valores persistentes entre renders. Se puede usar como una variable mutable que no provoca renderizados adicionales.

useRef devuelve un objeto con una propiedad .current, que puede almacenar cualquier valor y no se reinicia en cada render.

### Sintaxis básica

```js
const ref = useRef(initialValue);
```

- initialValue: el valor que queremos que la propiedad current del objeto retornado tenga al principio. Este argumento es ignorado luego del renderizado inicial.

### Cuándo usarlo y cuándo no

#### Usalo si...

- Querés manipular elementos DOM directamente. Ejemplo: Enfocar un input, desplazar un scroll o reproducir un video.
- Querés almacenar valores mutables entre renders. Ejemplo: Almacenar un temporizador o el valor anterior de una variable.
- Querés evitar renderizados innecesarios. Ejemplo: Referencias que cambian pero no afectan la UI.

#### No lo uses si...

- Necesitas provocar un re-render. En ese caso, usa useState.
- Tenés que almacenar datos reactivos. useRef no detecta cambios, por lo que no es adecuado para actualizar la UI.
- Tenés lógica compleja de estado. Usa useReducer o useState en lugar de useRef.

### Conceptos utilizados en los ejemplos

#### setInterval

Metodo que llama a una función o ejecuta un fragmento de código de forma reiterada, con un retardo de tiempo fijo entre cada llamada.

Este método devuelve un ID de intervalo que lo identifica de forma única, de ese modo, el intervalo puede ser eliminado más tarde llamando a clearInterval() .

### A tener en cuenta

- No escribir o leer ref.current durante el renderizado. Hacerlo desde los event handlers o los effect.

## useState

Se utiliza para declarar estados reactivos en componentes funcionales. Devuelve un par: el estado actual y una función para actualizarlo.

Es ideal para manejar estados simples o independientes dentro de un componente.

### Sintaxis básica

```js
const [state, setState] = useState(initialState);
```

### Cuándo usarlo y cuándo no

#### Usalo si...

- Necesitas un estado simple. Ejemplo: Contadores, toggles, formularios pequeños.
- El estado es independiente. Ejemplo: Cada instancia del componente tiene su propio estado.

#### No lo uses si...

- El estado tiene lógica compleja. Usa useReducer si hay varias acciones que afectan el estado o una lógica más estructurada.
- No necesitas re-renderizar. Si el valor no afecta la UI, considera usar useRef.
