# Single Responsibility Principle

Una funcion o una clase deberian tener una sola responsabilidad. Que tengan una responsabilidad **no** quiere decir que hagan una sola cosa.

El concepto de **_responsabilidad_** hace referencia a aquellos actores (fuentes de cambio) que podrían reclamar diferentes modificaciones en un determinado módulo dependiendo de su rol en el negocio. Esto quiere decir que solo un cambio potencial (lógica de base de datos, lógica de registro, lógica de negocio, lógica de persistencia -capacidad de una apliación de guardar datos para que se puedan recuperar-, etc.) en la especificación del software debería poder afectar la especificación de la clase.

Esto promueve cohesión y modularidad en el diseño de software. También facilita el mantenimiento y vuelve las pruebas unitarias más sencillas.

- Cohesión: los métodos y atributos de una clase están estrechamente relacionados y se concentran en cumplir esa responsabilidad específica.
- Modularidad: dividir un programa en módulos que puedan compilarse por separado, sin embargo tendrá conexiones con otros módulos.

## ¿Cómo identificar que se debe utilizar este principio?

- La función/clase o función tiene varias razones para cambiar (por ejemplo, la lógica de negocio y manejo de archivos en una misma clase)
- La función/clase realiza múltiples tareas no relacionadas entre sí
- La descripción del nombre de la función/clase hace más de una cosa
