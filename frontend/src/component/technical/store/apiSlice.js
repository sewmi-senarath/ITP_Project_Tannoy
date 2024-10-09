import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURI = "http://localhost:5000";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: baseURI }),
  endpoints: (builder) => ({
    // get categories
    getMachines: builder.query({
      query: () => "/api/getMachineCategory",
      providesTags: ["machine"],
    }),

    // get labels
    getMachineLabels: builder.query({
      query: () => "/api/machineLabels",
      providesTags: ["machine"],
    }),
    deleteMachine: builder.mutation({
      query: (recordId) => ({
        url: "/api/deletemachine",
        method: "DELETE",
        body: recordId,
      }),
      invalidatesTags: ["machine"],
    }),
    editMachine: builder.mutation({
      query: (recordId) => ({
        url: `/api/updatemachine/${recordId._id}`,
        method: "PUT",
        body: { recordId },
      }),
      invalidatesTags: ["machine"],
    }),

    addMachine: builder.mutation({
      query: (initialTransaction) => ({
        url: "/api/addmachine",
        method: "POST",
        body: initialTransaction,
      }),
      invalidatesTags: ["machine"],
    }),

  }),
});

export default apiSlice;
