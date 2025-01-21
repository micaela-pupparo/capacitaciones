import { useDebugValue, useEffect, useState } from "react";

function useAuthStatus() {
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setTimeout(() => setAuthenticated(true), 1000);
  }, []);

  useDebugValue(isAuthenticated ? "Usuario autenticado" : "No autenticado");

  return isAuthenticated;
}

export default useAuthStatus;
