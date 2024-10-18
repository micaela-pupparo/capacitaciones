# Desafío HTML y CSS

## Página finalizada

https://houseplants-supplies.netlify.app/

## Consignas del desafío

### Ejercicio de HTML y CSS: Replica de un Template de Elementor sin JavaScript

#### Objetivo

Evaluar y fortalecer tus conocimientos en HTML y CSS mediante la replicación de un template avanzado de Elementor, implementando diversos efectos y funcionalidades únicamente con HTML y CSS. Este ejercicio abarcará aspectos como la estructura semántica, diseño responsivo, técnicas avanzadas de CSS, manejo de layouts, y la implementación de efectos visuales sin recurrir a JavaScript.

#### Descripción del Template a Replicar

Selecciona un template de Elementor que incluya las siguientes secciones y características (puedes elegir un template de portafolio, landing page, sitio corporativo, etc.). Asegúrate de que el template seleccionado contenga una variedad de elementos para cubrir diferentes aspectos de HTML y CSS.

#### Elementos y Características a Replicar:

Header con Navegación Fija:

- Logo a la izquierda.
- Menú de navegación a la derecha con enlaces ancla.
- Efecto de cambio de color o tamaño al hacer scroll.
- Sección de Hero con Fondo de Imagen y Texto Superpuesto:

Imagen de fondo responsiva.

- Texto centralizado con tipografía estilizada.
- Botón de llamada a la acción con efectos de hover.
- Sección de Servicios o Características:

Íconos ilustrativos para cada servicio.

- Descripciones breves.
- Diseño en grid responsivo (usando CSS Grid o Flexbox).
- Portafolio o Galería de Imágenes:

Diseño de malla de imágenes.

- Efecto de hover que muestra el título o una superposición.
- Modal o lightbox implementado solo con CSS (opcional).
- Testimonios con Slider (Sin JavaScript):

Uso de input tipo radio para cambiar testimonios.

- Transiciones suaves entre testimonios.
- Formulario de Contacto:

Campos de entrada estilizados.

- Validaciones básicas con CSS (como estilos de foco).
- Footer con Enlaces y Redes Sociales:

Diseño limpio y organizado.

- Íconos de redes sociales con efectos de hover.
- Efectos Adicionales:

Animaciones al hacer scroll (usando CSS Animations o Transitions).

- Uso de pseudo-elementos para decoraciones.
- Implementación de variables CSS para mantener consistencia en - colores y fuentes.

### Requisitos Técnicos

#### Estructura HTML:

Utiliza etiquetas semánticas (<header>, <nav>, <section>, <article>, <footer>, etc.).
Accesibilidad: Asegúrate de que el sitio sea navegable mediante teclado y utiliza atributos alt en imágenes.
Estilos CSS:

Diseño responsivo: Utiliza media queries para adaptar el diseño a diferentes tamaños de pantalla (móviles, tablets, desktops).
Layout: Emplea Flexbox y/o CSS Grid para organizar el contenido.
Tipografía: Define una jerarquía clara utilizando diferentes tamaños, pesos y estilos de fuente.
Colores: Utiliza una paleta de colores consistente. Puedes implementar variables CSS para manejarlos eficientemente.
Efectos: Implementa transiciones, transformaciones y animaciones para mejorar la interactividad visual.
Sin Uso de JavaScript:

Todos los efectos interactivos deben lograrse únicamente con HTML y CSS. Para componentes como sliders o menús desplegables, utiliza técnicas como :hover, :focus, input type="radio", y checkbox hacks.
Optimización:

Asegúrate de que las imágenes estén optimizadas para web.
Minimiza el uso de CSS innecesario y organiza el código de manera clara y mantenible.

## Proceso de construcción de la página

#### Primera etapa

Busqué un template que cumpla con los requisitos a imitar. El template seleccionado es [este](https://elementor.com/library/template-kit/houseplants-supplies-shop-website-kit/preview/).

Inicialicé un repositorio remoto y lo cloné en mi computadora para empezar a organizar el carpetas y archivos el esqueleto de la página.

Luego empecé el proceso de descargar todas las imagenes disponibles e intenté encontrar iconos lo suficientemente parecidos para respetar el diseño. Algunos fueron descargados como imagenes svg y otros fueron utilizados con Font Awesome.
Para las imagenes svg generé un sprite con un generador automatico para agruparlos.
Me encontré que las imágenes al intentar convertirlas al formato webP pesaban más que estando en el formato original.
Una vez concluido esto, descargué las fuentes a utilizar y definí la paleta de colores.

#### Segunda etapa

Dividí en componentes todo el diseño. Quedó lo siguiente:

- links
- botones
- iconos
- grillas
- cartas
- citas
- media
- bubble chat
- formulario
- hero

Luego englobé los mismos en los siguientes bloques:

- categorias
- testimonios
- barra de navegador
- footer
- galeria de imagenes
- descripcion de la compañía
- contacto

#### Tercera etapa

Fui haciendo cada componente de manera aislada y adaptandolos a cada tamaño de dispositivo. Por cada componente creé un archivo html en donde alojarlo hasta que una todos una vez terminados. Además, por cada uno creé una sección dentro del archivo css para organizar bien el código.
Me encontré con ciertos desafíos en la creación de algunos componentes. Estos consistían en una superposición de imágenes que dificultaba que quede bien para todos los tamaños. Fue logrado con las posiciones relativas o absolutas.

#### Cuarta etapa

Empecé a unir todos los bloques y componentes en la página principal haciendo los ajustes necesarios.

#### Quinta etapa

Agregué las animaciones y creé las que hacían falta, como la que lograba que el componente de una vuelta completa o el slide de los testimonios.

#### Sexta etapa

Inicialicé el proyecto con npm e instalé parcel. Luego, desplegué la página con Netlify.

#### Séptima etapa

Audité la página y mejoré en lo posible su rendimiento.

## Páginas utilizadas en el proceso

- [Sprite Generator](https://svgsprit.es/)
- [Font Awesome](https://fontawesome.com/)
- [Animation On Scroll](https://michalsnik.github.io/aos/)
- [Page Speed](https://pagespeed.web.dev/)

## Herramientas

Para construcción:

`npm init`

`npm i --save-dev parcel`

Para desplegar:
[Netlify](https://www.netlify.com/)
