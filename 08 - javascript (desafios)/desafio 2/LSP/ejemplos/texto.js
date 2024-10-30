class Texto {
    constructor(contenido) {
        this.contenido = contenido;
    }

    formatear() {
        reutrn `<b>${this.contenido}</b>`
    }
}


// cambia el comportamiento del metodo formatear
class TextoGrande extends Texto {
    formatear() {
        return `<span style='font-size: 20px'>${this.contenido}</span>`
    }
}

const texto = new Texto('soy un texto');