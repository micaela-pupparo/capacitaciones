# Dependency Inversion Principle

> "Los módulos de alto nivel no deben depender de los módulos de bajo nivel. Ambos deben depender de abstracciones. Las abstracciones no deben depender de los detalles. Los detalles deben depender de las abstracciones".

En el contexto del DIP, “inversión” significa que las dependencias entre módulos de un sistema deberían invertirse en comparación con el enfoque tradicional. En lugar de que los módulos de alto nivel dependan directamente de los módulos de bajo nivel, ambos deben depender de abstracciones o interfaces comunes. Se refiere a que los componentes importantes (capas superiores) no deberían depender de componentes menos importantes (capas inferiores).

Desde el punto de vista de la arquitectura hexagonal, los componentes más importantes son
aquellos centrados en resolver el problema subyacente al negocio, es decir, la capa
de dominio. Los menos importantes son los que están próximos a la infraestructura,
es decir, aquellos relacionados con la UI, la persistencia, la comunicación con API
externas, etc.

Esto facilita la interoperabilidad entre diferentes componentes o módulos del sistema, si varias partes del sistema cumplen con las mismas interfaces, se vuelven intercambiables y se pueden conectar sin problemas. Simplifica la gestión de cambios, facilita las pruebas de integración y la adopción de patrones de diseño.

## ¿Cuándo implementar este principio?

- Las clases de alto nivel dependen directamente de clases de bajo nivel, lo cual hace dificil modificar o reemplazar partes del sistema
  -Al cambiar la implementacion de una clase de bajo nivel, el código de alto nivel también debe modificarse
- Las clases no son fácilmente testeables o se requiere mucho esfuerzo para reemplazar las dependencias.
