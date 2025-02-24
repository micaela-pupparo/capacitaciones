import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../store/configureStore";
import { FieldValues, useForm } from "react-hook-form";
import { userAdded, userLoggedIn } from "../../store/users";
import { useLocation, useNavigate, Link } from "react-router";
import { FaTrello } from "react-icons/fa6";

// ------------------------------------- ESTILOS -------------------------------------

const FormContainer = styled.div`
  margin: 50px 0;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 100px);
`;

const Form = styled.form`
  max-width: 400px;
  padding: 32px 40px;
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px;
  color: #42526e;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TrelloText = styled.p`
  color: rgb(68, 84, 111);
  font-size: 2rem;
  margin: 0 0 0 5px;
  font-weight: 700;
`;

const RegisterText = styled.p`
  color: #172b4d;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  margin-top: 24px;
`;

const Input = styled.input`
  box-sizing: border-box;
  padding: 8px 6px;
  outline: none;
  border: 1px solid #7a869a;
  margin: 8px 0;
  height: 40px;
`;

const Button = styled.button`
  width: 100%;
  background-color: #0052cc;
  color: #fff;
  border: 0;
  border-radius: 3px;
  height: 40px;
  margin-top: 20px;
  cursor: pointer;

  &:disabled {
    background-color: #085cdaa4;
  }
`;

const LoginLink = styled(Link)`
  display: block;
  width: 100%;
  color: #0c66e4;
  text-align: center;
  font-size: 14px;
  margin-top: 15px;

  &:hover {
    color: #053981;
  }
`;

// ------------------------------------- COMPONENTE -------------------------------------

const schema = z.object({
  username: z.string().min(3),
  password: z
    .number({ invalid_type_error: "La contraseña es requerida" })
    .min(10, { message: "La contraseña debe tener al menos 10 caracteres." }),
  name: z.string().min(1),
});

type FormData = z.infer<typeof schema>;

const RegisterForm = () => {
  const users = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();
  const { username } = location.state || { username: "" };

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => {
    let newUser = {
      username: data.username,
      name: data.name,
    };

    const existingUsername = users.list.find(
      (user) => user.username === newUser.username
    );

    if (existingUsername)
      return setError("username", { message: "Este usuario ya existe." });

    dispatch(userAdded(newUser));
    dispatch(userLoggedIn(newUser));

    navigate("/user/boards");
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit(onSubmit)} role="form">
        <LogoContainer>
          <FaTrello color="#0079bf" size={32} />
          <TrelloText>Trello</TrelloText>
        </LogoContainer>

        <RegisterText>Regístrate para continuar</RegisterText>

        <Input
          {...register("username", { required: true })}
          name="username"
          defaultValue={username}
          type="text"
          placeholder="Introduce tu nombre de usuario"
        />
        {errors.username && <p>{errors.username.message}</p>}

        <Input
          {...register("password", { required: true, valueAsNumber: true })}
          name="password"
          type="password"
          placeholder="Introduce tu contraseña"
        />
        {errors.password && <p>{errors.password.message}</p>}

        <Input
          {...register("name", { required: true })}
          name="name"
          type="text"
          placeholder="Introduce tu nombre"
          aria-label="name"
        />
        {errors.name && <p>{errors.name.message}</p>}

        <Button disabled={!isValid} type="submit">
          Registrarme
        </Button>

        <LoginLink to="/login">
          ¿Ya tienes una cuenta Atlassian? Iniciar sesión
        </LoginLink>
      </Form>
    </FormContainer>
  );
};

export default RegisterForm;
