import styled from "styled-components";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import { userLoggedIn } from "../../store/users";
import { useNavigate } from "react-router";

// ------------------------------------- ESTILOS -------------------------------------

const FormContainer = styled.div``;

const Form = styled.form``;

const Input = styled.input``;

const Button = styled.button``;

// ------------------------------------- COMPONENTE -------------------------------------

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "El usuario debe tener al menos 3 caracteres." }),
  password: z
    .number({ invalid_type_error: "La contraseña es requerida" })
    .min(10, { message: "La contraseña debe tener al menos 10 caracteres." }),
});

type FormData = z.infer<typeof schema>;

const LoginForm = () => {
  const users = useSelector((state: RootState) => state.users.list);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => {
    const user = users.find(user => user.username === data.username)

    if (!user) return setError('username', {
        message: 'Los datos son inválidos.'
    })

    dispatch(userLoggedIn(user));
    console.log('Submitted');
    
    navigate('/boards')
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h1>Login</h1>

        <Input
          {...register("username", { required: true })}
          type="text"
          name="username"
          placeholder="Username"
        />
        {errors.username && <p>{errors.username.message}</p>}

        <Input
          {...register("password", { required: true, valueAsNumber: true })}
          type="password"
          name="password"
          placeholder="Password"
        />
        {errors.password && <p>{errors.password.message}</p>}

        <Button disabled={!isValid}>Login</Button>
      </Form>
    </FormContainer>
  );
};

export default LoginForm;
