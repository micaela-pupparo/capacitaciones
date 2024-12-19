import { axios } from "axios";
import * as actions from "../api";

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.apiCallBegan.type) return next(action);

    const { url, method, data, onStart, onSuccess, onError } = action.payload;

    if (onStart) dispatch({ type: onStart }); //primero va a estar este porque la api call deberia ser una consecuencia de que se pidan los bugs

    next(action); // esto es para que la accion de apiCallBegan aparezca en redux devtools. si no se hace esto es como que se "traga" la accion original al despacha otra accion

    try {
      const response = await axios.request({
        baseURL: "http://localhost:9001/api",
        url,
        method,
        data,
      });
      // Success general
      dispatch(actions.apiCallSuccess(response.data));
      // Success mas especifico
      if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
    } catch (error) {
      // Error general
      dispatch(actions.apiCallFailed(error.message));
      // Error mas especifico
      if (onError) dispatch({ type: onError, payload: error.message }); //para cheqeuar que en la accion nos estan pasando la propiedad onError
    }
  };

export default api;
