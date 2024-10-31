import { Texto } from "./texto.js";

// cambia el comportamiento del metodo formatear
class TextoGrande extends Texto {
  formatear() {
    return `<span style='font-size: 20px'>${this.contenido}</span>`;
  }
}
