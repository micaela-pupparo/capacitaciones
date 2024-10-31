class Pagos {
    procesar(monto) {
        if (monto <= 0)
            throw new Error('monto invalido')
        return console.log('pago realizado');
    }
}

// aca podemos ver como la transferencia acepta montos invalidos, por lo que
// cambia el comportamiento esperado de procesar un pago
class Transferencia extends Pagos {
    procesar(monto) {
        return console.log('pago hecho con transferencia')
    }
}