# Desafío 1 - JavaScript

Desafío generado al finalizar las capacitaciones para la introducción de JavaScript. Involucra entender conceptos como hoisting, funciones de tipo closure, clases, prototipos, herencias, entre otros. Consiste en una gestión de usuarios desde el lado del navegador utilizando funciones constructoras para entender mejor el trasfondo de las clases.

## Consignas

### Hoisting y Closures

**Hoisting**: Crea ejemplos claros que muestren la diferencia entre variables y funciones declaradas con var, let, y const. Incluye ejemplos donde se muestre cómo el hoisting afecta el comportamiento del código.

**Closures**: Implementa una función que cree usuarios y almacene información sensible como la contraseña de manera privada. Solo deben ser accesibles ciertos métodos públicos como login o cambiarContraseña, utilizando closures para encapsular los datos sensibles.

### Herencia Prototipal y OOP

**Clases Base y Derivadas**: crea una clase base Usuario con propiedades como nombre, email, y métodos comunes como login() y logout(). Usa herencia prototipal para crear subclases Administrador, Editor y UsuarioRegular, donde cada una tenga permisos y funcionalidades específicas. Por ejemplo:

- El Administrador puede agregar o eliminar usuarios.
- El Editor puede modificar contenido pero no usuarios.
- El UsuarioRegular puede solo ver contenido.
  **Herencia Prototipal**: Evita el uso de class y utiliza directamente prototipos de JavaScript para implementar la herencia en una parte del ejercicio.

### Características Modernas de JavaScript

**Arrow Functions**: Usa funciones flecha para métodos que no requieren su propio contexto (this).
**Template Literals**: Usa template literals para generar mensajes dinámicos, como `"Bienvenido, ${nombre}"` o `"El usuario ${email} ha iniciado sesión."`.

**Destructuring**: Utiliza destructuring para extraer propiedades específicas de los objetos de usuario, por ejemplo, `const { nombre, email } = usuario;`.

### Módulos y Webpack

**Modularización**: Organiza tu código dividiéndolo en módulos claros, por ejemplo:

- Un módulo para la clase Usuario.
- Un módulo para manejar los roles y permisos.
- Un módulo para la autenticación y gestión de sesiones.

**Webpack**: Configura un proyecto en Webpack. Asegúrate de tener un archivo webpack.config.js que incluya:

- Entrada: Define el archivo principal de tu aplicación (ej. src/index.js).
- Salida: Configura la salida compilada (ej. en dist/main.js).
- Loaders y Plugins: Si es necesario, incluye loaders para manejar ES6/ES7, CSS o imágenes, y usa plugins para optimizar el bundle.

### Buenas Prácticas de la Industria

- Validaciones Robustas: Asegúrate de validar la entrada de datos en los métodos. Por ejemplo, verifica que el email sea válido y que los campos obligatorios no estén vacíos.
- Nombres Descriptivos: Usa nombres de variables y funciones claros y descriptivos. Evita abreviaciones que no sean estándar.
- Refactorización y Limpieza: Aplica principios como DRY (Don’t Repeat Yourself) y KISS (Keep It Simple, Stupid). Refactoriza cualquier código repetido y simplifica la lógica siempre que sea posible.
- Comentarios: Documenta tu código cuando sea necesario, pero no agregues comentarios redundantes que expliquen lo obvio.

## Estructura del Proyecto

```bash
dist/
    bundle.js
src/
    modules/
        auth.js
        roles.js
        usuario.js
    public/
        index.html
    index.js
.babelrc
.gitignore
package.json
webpack.config.js
```

## Configuración e Instalación

Este proyecto utilizó webpack y babel que ya están especificados en el package.json, por lo que sólo debemos ejecutar:

`npm i`

Gracias al script dentro de package.json:

```js
"build": "webpack -w"
```

Podemos correr en terminal:

`npm run build`

## Decisiones de Diseño

- **Herencia**: creé una clase padre llamada Usuarios y dos clases hijos Administrador y Editor. Decidí obviar el rol Regular porque son funciones que los administradores y editores tienen disponible, por lo que crear un nuevo objeto que herede todo lo de Usuarios y no tenga funcionalidades nuevas era un desperdicio de recursos.

Para Usuarios diseñé lo siguiente:

```js
function Usuarios(nombre, email, contraseña) {
  //propiedades publicas
  this.nombre = nombre;
  this.email = email;

  //propiedades privadas
  _contraseña.set(this, contraseña);
  _logueoEIntentos.set(this, { logueado: false, intentos: 0 });

  //para implementar closures
  let historialAcceso = [];
  this.agregarAcceso = function () {
    const horarioAcceso = new Date().toISOString();
    historialAcceso.push(horarioAcceso);
    if (historialAcceso.length > 5) historialAcceso.shift();
  };
  this.mostrarHistorialAcceso = function () {
    return historialAcceso.slice();
  };

  //para almacenar todas las instancias
  usuarios.push(this);
}
```

Para Administrador:

```js
function Administrador(nombre, email, _contraseña) {
  Usuarios.call(this, nombre, email, _contraseña);
  _tipo.set(this, "admin");
}

Administrador.prototype = Object.create(Usuarios.prototype);
Administrador.prototype.constructor = Administrador;
```

Para Editor:

```js
export function Editor(nombre, email, _contraseña) {
  new Usuarios(nombre, email, _contraseña);
  _tipo.set(this, "editor");
}

Editor.prototype = Object.create(Usuarios.prototype);
Editor.prototype.constructor = Editor;
```

- **Closures**: crear closures que privaticen al exterior la lógica de las validaciones fue mi primer pensamiento, hasta que me encontré con la necesidad de tener que duplicar dichas closures. Por este motivo, las eliminé y creé un historial de accesos para poder utilizar closures sin la necesidad de imponerlas en situaciones donde era más eficiente el uso de otros métodos.

## Desafíos Enfrentados

- Crear closures
- Tratar de abstraerme de la implementación de usuarios desde el lado del servidor. Esto es dado a la implementación de base de datos y la utilización de formularios.

## Mejoras Futuras

- Fabricar la lógica para bloquear una cuenta al hacer muchos intentos de inicio sesión
- Formatear la contraseña
- Fabricar la lógica para editar contenido de los Editores
