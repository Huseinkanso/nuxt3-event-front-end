import type { UseFetchOptions } from "nuxt/app";
import { useRequestHeaders } from "nuxt/app";
import { useCookie, useFetch } from "nuxt/app";
export function useApiFetch<T>(path: string, options: UseFetchOptions<T> = {}) {
  let headers: any = {
    accept: "application/json",
    referer: "http://localhost:3000",
  };

  const token = useCookie("XSRF-TOKEN");
  const authToken = useCookie("token");
  if (token.value) {
    headers["X-XSRF-TOKEN"] = token.value as string;
  }
  if (authToken.value) {
    headers["Authorization"] = `Bearer ${authToken.value as string}`;
  }
  // on full page reload usefetch run on the server
  // here run without the headers so we need to add them when it is on server
  if (process.server) {
    headers = {
      ...headers,
      ...useRequestHeaders(["referer", "cookie"]),
    };
  }

  return useFetch("http://localhost/api" + path, {
    credentials: "include",
    watch: false,
    ...options,
    headers: {
      ...headers,
      ...options?.headers,
    },
  });
}

// this will let browser store token
// credentials: "include",
