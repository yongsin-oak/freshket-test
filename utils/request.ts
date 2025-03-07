import axios from "axios";

const request = axios.create({
  baseURL: "http://192.168.1.133:8080/",
});
axios.interceptors.request.use(
  function (config: any) {
    return {
      ...config,
      headers: {
        ...config.headers,
        Accept: "application/json",
      },
    };
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default request;
