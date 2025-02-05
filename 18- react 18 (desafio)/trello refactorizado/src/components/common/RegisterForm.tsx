import React from "react";
import styled from "styled-components";

// ------------------------------------- ESTILOS -------------------------------------

const FormContainer = styled.div``;

const Form = styled.form``;

const Input = styled.input``;

const Button = styled.button``;

// ------------------------------------- COMPONENTE -------------------------------------

const RegisterForm = () => {
  return (
    <FormContainer>
      <h1>Register</h1>

      <Form>
        <Input name="username" type="text" placeholder="Username" />
        <Input name="password" type="password" placeholder="Password" />
        <Input name="name" type="text" placeholder="Name" />

        <Button type="submit"></Button>
      </Form>
    </FormContainer>
  );
};

export default RegisterForm;
