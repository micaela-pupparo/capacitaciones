//                      EXERCISE -- OBJECT EQUALITY
function Address(street, city, zipCode) {
    this.street = street;
    this.city = city;
    this.zipCode = zipCode;
}

let address1 = new Address('a', 'b', 'c');
let address2 = new Address('a', 'b', 'c');

function areEqual(address1, address2) {
    return address1.street === address2.street &&
        address1.city === address2.city &&
        address1.zipCode === address2.zipCode;
}

function areSame(address1, address2) {
    //busca que referencien al mismo objeto
    return address1 === address2;
}

areEqual(address1, address2); //true
areSame(address1, address2); //false
//no son el mismo objeto, son dos objetos localizados en distintas
//direcciones de memoria

let address3 = address1;
areSame(address1, address3); //true