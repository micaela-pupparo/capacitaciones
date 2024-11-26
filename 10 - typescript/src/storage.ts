export default class Store3 {}

// export default puede coexistir con el export normal
export enum Format { Raw, Compressed }

// implementaciones que no se necesitan exportar, sino mantener en el modulo
class Compressor {}
class Encryptor {}