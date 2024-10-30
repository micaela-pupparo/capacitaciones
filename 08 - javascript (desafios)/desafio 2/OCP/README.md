# Open-Closed Principle

> "Todas las entidades software deberían estar abiertas a extensión, pero cerradas a modificación" -Bertrand Meyer

Se recomienda que, en los casos en los que se introduzcan nuevos comportamientos en sistemas existentes, en lugar de modificar los componentes antiguos, se deben crear componentes nuevos. Esto es porque si esos componentes o clases están siendo usadas en otra parte estaremos alterando su comportamiento y provocando efectos indeseados.

Esto ayuda a la correcta evolución del sistema, la reutilización del código -promueve la creación de componentes independientes y modulares que son fáciles de reutilizar en diferentes contextos. Los componentes que cumplen con estoson más flexibles y se pueden adaptar para su uso en diferentes escenarios-, facilita el desarrollo colaborativo -diferentes desarrolladores pueden trabajar en paralelo en la implementación de nuevas funcionalidades sin interferir entre sí-.

## ¿Cómo identificar que se debe utilizar este principio?

- Los cambios en los requisitos requieren que modifiques directamente las clases o funciones existentes
- Hay riesgo de crear errores en funcionalidades que ya funcionan al realizar actualizaciones.
