import axios from "axios";

const { REACT_APP_SERVER } = process.env;

const instance = axios.create({
  baseURL: `${REACT_APP_SERVER}/api/`,
});

export default instance;
