export class Texto {
  constructor(contenido) {
    this.contenido = contenido;
  }

  formatear() {
    reutrn`<b>${this.contenido}</b>`;
  }
}

const texto = new Texto("soy un texto");
