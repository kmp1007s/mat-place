import axios, { AxiosRequestConfig } from "axios";

const { REACT_APP_SERVER } = process.env;

const configuredAxios = axios.create({
  baseURL: `${REACT_APP_SERVER}/api/`,
  withCredentials: true,
});

export default configuredAxios;

export async function request<T, K>(
  method: AxiosRequestConfig["method"],
  url: string,
  data?: K
) {
  const response = await configuredAxios.request<T>({
    method,
    url,
    data,
  });

  console.log("axios response: ", response);

  return response;
}
