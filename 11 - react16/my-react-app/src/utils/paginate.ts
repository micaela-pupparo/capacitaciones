import _ from "lodash";
import IMovie from "../models/Movie";

export function paginate(
  items: IMovie[],
  pageNumber: number,
  pageSize: number
) {
  const startIndex = (pageNumber - 1) * pageSize;
  // se envuelve el items en parentesis para permitir el encadenamiento de metodos
  // value es para que devuelva el objeto y no un lodash object
  return _(items).slice(startIndex).take(pageSize).value();
}
