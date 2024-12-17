import { apiSlice } from "@/redux/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    transformResponse: (response) => {
      if (response?.data?.token) {
        const decodedToken = JSON.parse(
          atob(response.data.token.split(".")[1])
        );
        const expiration = new Date(decodedToken.exp * 1000);
        if (expiration <= new Date()) {
          throw new Error("Token expired");
        }
      }
      return response;
    },
    register: builder.mutation({
      query: (userData) => ({
        url: "/registration",
        method: "POST",
        body: {
          email: userData.email,
          first_name: userData.firstName,
          last_name: userData.lastName,
          password: userData.password,
        },
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApiSlice;
