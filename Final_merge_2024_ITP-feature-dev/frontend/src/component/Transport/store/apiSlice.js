import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURI = "http://localhost:5000";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: baseURI }),
  endpoints: (builder) => ({
   
    // get labels
    getTransportLabels: builder.query({
      query: () => "/api/transportLabels",
      providesTags: ["transport"]
    }),
    deleteTransport: builder.mutation({
      query: (recordId) => ({
        url: "/api/deletetransport",
        method: "DELETE",
        body: recordId
      }),
      invalidatesTags: ["transport"]
    }),
    editTransport: builder.mutation({
      query: (recordId) => ({
        url: `/api/updatetransport/${recordId._id}`,
        method: "PUT",
        body: { recordId }
      }),
      invalidatesTags: ["transport"]
    }),

    addTransport: builder.mutation({
      query: (initialTransaction) => ({
        url: "/api/addtransport",
        method: "POST",
        body: initialTransaction
      }),
      invalidatesTags: ["transport"]
    })
  })
});

export default apiSlice;
