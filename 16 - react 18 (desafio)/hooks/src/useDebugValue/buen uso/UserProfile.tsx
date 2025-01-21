import useAuthStatus from "./useAuthStatus";

const UserProfile = () => {
  const isAuthenticated = useAuthStatus();

  return (
    <div>
      {isAuthenticated ? "Bienvenido, usuario" : "Por favor, inicia sesión"}
    </div>
  );
};

export default UserProfile;
