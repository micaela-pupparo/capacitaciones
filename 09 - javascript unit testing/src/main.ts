export function calculateDiscount(price: number, discountCode: string) {
    if (price <= 0) { // typeof price !== 'number' ya no hace falta validar esto
      return 'Invalid price';
    }
  
    // if (typeof discountCode !== 'string') {
    //   return 'Invalid discount code';
    // }
  
    let discount = 0;
    if (discountCode === 'SAVE10') {
      discount = 0.1;
    } else if (discountCode === 'SAVE20') {
      discount = 0.2;
    }
  
    return price - price * discount;
  }