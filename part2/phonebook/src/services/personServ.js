import axios from "axios";

const baseURL = "https://protected-bayou-84240.herokuapp.com/api/persons";

const getAll = () => {
  const request = axios.get(baseURL);
  return request.then((response) => response.data);
};

const add = (anObj) => {
  const request = axios.post(baseURL, anObj);
  return request.then((response) => response.data);
};

const deleteEntry = (id) => {
  const request = axios.delete(`${baseURL}/${id}`);
  return request;
};

const update = (id, anObj) => {
  const request = axios.put(`${baseURL}/${id}`, anObj);
  return request.then((response) => response.data);
};

export default { getAll, add, deleteEntry, update };
