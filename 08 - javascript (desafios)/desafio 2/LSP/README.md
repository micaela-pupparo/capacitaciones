# Liskov Substitution Principle

> "Las funciones que utilicen punteros o referencias a clase base deben ser capaces de usar objetos de clases derivadas sin saberlo". -Robert C. Martin

Si _s_ es un subtipo de **T**, entonces los objetos de tipo **T** pueden ser reemplazados por objetos de tipo _s_ sin alterar la correción del programa.

Si una clase derivada modifica el comportamiento de la clase base de tal manera que ya no se puede sustituir sin cambiar el comportamiento esperado, entonces es un indicativo de que la herencia podría no estar siendo utilizada correctamente.

## ¿Cómo identificar cuándo usar este principio?

- Obeservar si los métodos sobresctricos en una clase hija tienen el comportamiento esperado. Si una clase hija devuelve un null o lanza una excepción significa que algo anda mal.
- Cuando algunas clases derivadas no pueden reemplazar a su clase base sin causar errores o comportamientos inesperados.
- La subclase sobrescribe métodos de la clase base de manera que cambian su funcionalidad principal en lugar de extenderla.
- Diferencia con los datos requeridos (parametros, por ejemplo) en el metodo sobrescrito
- Subclases que ignoran comportamientos esenciales del metodo

## Implementación

Se debe evitar modificar métodos heredados de la clase base en la subclase a menos que sea para extender su funcionalidad de manera natural.
