//                  EXERCISE -- AREA OF CIRCLE
const circle = {
  radius: 1,
  //al no tener un setter se vuelve un read only
  get area() {
    return Math.PI * this.radius ** 2;
  },
};

console.log(circle.area);
