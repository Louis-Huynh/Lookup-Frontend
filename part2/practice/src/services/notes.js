import axios from "axios";

const baseURL = "http://localhost:3001/notes";

const getAll = () => {
  const request = axios.get(baseURL);
  //   return request.then((response) => response.data);
  const nonExisting = {
    id: 10000,
    content: "This note is not saved to server",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
  };
  console.log("yo");

  return request.then((response) => response.data.concat(nonExisting));
};

const create = (anObj) => {
  const request = axios.post(baseURL, anObj);
  return request.then((response) => response.data);
};

const update = (anObj, id) => {
  const request = axios.put(`${baseURL}/${id}`, anObj);
  return request.then((response) => response.data);
};

const deleteIt = (id) => {
  const request = axios.delete(`${baseURL}/${id}`);
  return request;
};

export default {
  getAll,
  create,
  update,
  deleteIt,
};
