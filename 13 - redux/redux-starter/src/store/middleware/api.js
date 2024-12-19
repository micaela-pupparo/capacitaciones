import { axios } from "axios";
import * as actions from "../api";

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.apiCallBegan.type) return next(action);

    next(action); // esto es para que la accion de apiCallBegan aparezca en redux devtools. si no se hace esto es como que se "traga" la accion original al despacha otra accion

    const { url, method, data, onSuccess, onError } = action.payload;

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
      dispatch(actions.apiCallFailed(error));
      // Error mas especifico
      if (onError) dispatch({ type: onError, payload: error }); //para cheqeuar que en la accion nos estan pasando la propiedad onError
    }
  };

export default api;
