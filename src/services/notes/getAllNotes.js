import axios from "axios";
//const urlBase1 = 'http://localhost:3001/api/notes' //con mongo
const urlBase2 = 'https://api-with-mongo.herokuapp.com/api/notes' //deployada sin mongo
export const getAllNotes = () => {
    return axios
    .get(urlBase2)
    .then((response) => {
      const { data } = response;
      return data;
    });
};