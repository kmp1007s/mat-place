import axios, { AxiosRequestConfig } from "axios";

const { REACT_APP_SERVER } = process.env;

const configuredAxios = axios.create({
  baseURL: `${REACT_APP_SERVER}/api/`,
  withCredentials: true,
});

const kakaoAxios = axios.create({
  headers: {
    Authorization: "KakaoAK " + process.env.REACT_APP_KAKAO_REST_API_KEY,
  },
});

export default configuredAxios;

export async function request<T, K>(param: {
  method: AxiosRequestConfig["method"];
  url: string;
  data?: K;
  headers?: object;
  useKakao?: boolean;
}) {
  const { method, url, data, headers, useKakao } = param;
  let axiosToUse = configuredAxios;

  // 카카오 REST API를 사용하면
  if (useKakao) axiosToUse = kakaoAxios;

  if (data) {
    console.log("axios request: ", data);
  }

  const response = await axiosToUse.request<T>({
    method,
    url,
    data,
    headers,
  });

  console.log("axios response: ", response);

  return response;
}
