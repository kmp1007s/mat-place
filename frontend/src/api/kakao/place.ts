import { request } from "lib/axios";

export const keywordSearch = (keyword: string) => {
  const host = "https://dapi.kakao.com";
  const endpoint = "/v2/local/search/keyword.json";
  return request<object, void>({
    method: "GET",
    url: host + endpoint + `?query=${keyword}&category_group_code=FD6`,
    useKakao: true,
  });
};

export const imageSearch = (param: { keyword: string; size?: number }) => {
  const { keyword, size } = param;

  const host = "https://dapi.kakao.com";
  const endpoint = "/v2/search/image";

  let url = host + endpoint + `?query=${keyword}`;

  if (size) url += `&size=${size}`;

  return request<object, void>({
    method: "GET",
    url,
    useKakao: true,
  });
};
