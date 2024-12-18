const logger = (param) => (store) => (next) => (action) => {
  console.log("store", store); //es un objeto que PARECE el store. pero tiene solo las propiedades/metodos getState y dispatch
  console.log("next", next);
  console.log("action", action);

  next(action);
};

export default logger;
