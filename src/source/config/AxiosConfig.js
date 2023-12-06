import axios from "axios";

const instance = axios.create({
  baseURL: `http://localhost:8080/info-proj/`,
  headers: {
    Accept: "*",
  },
  timeout: 300000,
});

export default instance;
