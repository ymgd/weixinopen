import axios from 'axios';

export default (method, uri, data) => {

  if (method === 'get') {
    return axios.get(uri, {
        baseURL: '',
        headers: {},
        params: data
      })
      .then((res) => {
        return res;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  if (method === 'post') {
    return axios.post(uri, data, {
        baseURL: '',
        headers: {}
      })
      .then((res) => {
        return res;
      })
      .catch((error) => {
        console.log(error);
      });
  }

}
