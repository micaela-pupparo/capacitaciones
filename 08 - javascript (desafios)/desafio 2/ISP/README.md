# Interface Segregation Principle

> "Los clientes no deberian estar obligados a depender de interfaces que no utilicen" -Robert C. Martin

Una clase no debería depender de métodos o propiedades que no necesita. Para solucionar esto podemos solucionarlo con una herencia múltiple con mixins. Un mixin toma como parámetro una clase base y devuelve esta misma clase con las modificaciones necesarias.

## ¿Cuándo implementar este principio?

- Cuando alguna clase implementa métodos de una interfaz que no utiliza o que están vacíos
- Al implementar una interfaz general, algunas clases deben agregar comportamientos irrelevantes solo para cumplir con el contrato de la interfaz
