//                      EXERCISE -- FACTORY AND CONSTRUCTOR FUNCTIONS
function createAddress(street, city, zipCode) {
    return {
        street,
        city,
        zipCode
    }
}

const address = createAddress('a', 'b', 'c');
console.log(address);

function Address(street, city, zipCode) {
    this.street = street;
    this.city = city;
    this.zipCode = zipCode;
}

const anotherAddress = new Address('d', 'e', 'f');
console.log(anotherAddress);