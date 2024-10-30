class Carrito {
    #productos = ["cartera", "permufe"];

    mostrarProductos() {
        this.#productos.map(producto => console.log(producto));
    }
}

// no podemos agregar ningun producto, por lo que constantemente tendrimos
// que modificar la clase.

class Carrito {
    #productos = ["cartera", "permufe"];

    mostrarProductos() {
        this.#productos.map(producto => console.log(producto));
    }

    agregarProducto(producto) {
        this.#productos.push(producto);
    }
}