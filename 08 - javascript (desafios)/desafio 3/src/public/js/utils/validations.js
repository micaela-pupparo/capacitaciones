export class Validaciones {
    static vacio = function(...valores) {
        const regex = /^(?!\s*$).+/
        valores.forEach(valor => {
            if(!regex.test(valor))
                throw new Error("el nombre no debe estar vacio");
        })
    }

    static nombre = function(nombre) {
        const regex = /^(?!\s*$)[A-Za-z0-9\s]+$/;
        if (!regex.test(nombre)) 
            throw new Error("el nombre debe tener números y letras");   
    }

    static descripcion = function(descripcion) {
        if (descripcion.length > 100) {
            throw new Error("descripcion muy larga");
        }
    }
}