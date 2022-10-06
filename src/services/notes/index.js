import axios from "axios";
//const urlBase1 = 'http://localhost:3001/api/notes' //con mongo
const urlBase2 = 'https://api-with-mongo.herokuapp.com/api/notes' //deployada sin mongo

export const create = ({content, date, important}) => {
    //return Promise.reject('something bad happened')
    return axios.post(urlBase2, {content, date, important})
    .then((response) => {
      const { data } = response;
      return data;
    });
}

export const getAll = () => {
    return axios
    .get(urlBase2)
    .then((response) => {
      const { data } = response;
      return data;
    });
}