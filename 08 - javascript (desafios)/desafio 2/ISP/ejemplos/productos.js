class Productos {
    #nombre;
    #numeroProductos;
    #tipoProducto;

    constructor() {
        this.numeroProductos();
        this.tipoProducto();
    }

    // ...
}

const EdadApropiadaMixin = (Clase) => class extends Clase {
    constructor() {
        super();
        this.edadRecomendada();
    }

    edadRecomendada() {}
}