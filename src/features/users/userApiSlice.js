import { apiSlice } from "@/redux/api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: "/profile",
        method: "GET",
        headers: (headers) => {
          const token = localStorage.getItem("accessToken");
          if (token) {
            headers.set("Authorization", `Bearer ${token}`);
          }
          return headers;
        },
      }),
      transformResponse: (response) => {
        if (response.status === 0) {
          return response.data;
        } else {
          throw new Error(response.message || "Gagal mengambil data profil");
        }
      },
    }),
    getBalance: builder.query({
      query: () => ({
        url: "/balance",
        method: "GET",
        headers: (headers) => {
          const token = localStorage.getItem("accessToken");
          if (token) {
            headers.set("Authorization", `Bearer ${token}`);
          }
          return headers;
        },
      }),
      transformResponse: (response) => {
        if (response.status === 0) {
          return response.data;
        } else {
          throw new Error(response.message || "Gagal mengambil data balance");
        }
      },
      pollingInterval: 5000,
      refetchOnReconnect: true,
    }),
  }),
});

export const { useGetBalanceQuery, useGetProfileQuery } = userApiSlice;
