import React, { Component } from "react";
import Joi from "joi-browser";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    // por default Joi terminates las validaciones cuando encuentra un error, por eso debemos sacare ese comportamiento para obtener todos los errores
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);

    if (!error) return null;

    // mapeamos un array a un objeto
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    // luego con esa referencia podemos acceder al elemento con current z de ahi sacamos su valor
    // const username = this.username.current.value;

    const errors = this.validate();
    // debemos hacer esto en setstate porque siempre se le debe pasar un objeto a errors, si se le pasa null tira error
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };
}

export default Form;
