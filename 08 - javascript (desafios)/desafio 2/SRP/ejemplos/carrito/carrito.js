// en este ejemplo tenemos una clase carrito que refiere a un carrito de compras
// para un e-commerce.
// aca vemos de nuevo que el principio de responsabilidad unica no se está utilizando

class Carrito {
  constructor() {
    this.productos = [];
  }

  agregarProducto(producto) {
    this.productos.push(producto);
  }

  procesarPedido() {
    //logica para tener el total a pagar y mostrarlo al usuario
  }

  pagarPedido() {
    //logica para pagar el total
  }
}

// carrito se está encargando de juntar en un array todos los productos que
// el usuario va agregando pero también se encarga de obtener el total
// y procesar el pago

class Carrito {
  constructor() {
    this.productos = [];
  }

  agregarProducto(producto) {
    this.productos.push(producto);
  }
}
