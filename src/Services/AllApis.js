
import { base_url } from "./baseUrl";
import commonApi from "./CommonApi";


export const addToDo = async (data) => {
  return await commonApi("POST", `${base_url}/todos`, data);
};

export const getToDo = async () => {
  return await commonApi("GET", `${base_url}/todos`, "");
};

export const deleteToDo = async (id) => {
  return await commonApi("DELETE", `${base_url}/todos/${id}`, {});
};
export const completeToDo = async (id) => {
  return await commonApi("DELETE", `${base_url}/todos/${id}`, {});
};