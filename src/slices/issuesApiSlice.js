// src/slices/issuesApiSlice.js
import { apiSlice } from "./apiSlice";
import { ISSUES_URL } from "../constants"; // Adjust the import path as necessary

export const issuesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getIssues: builder.query({
      query: () => `${ISSUES_URL}`,
    }),
    createIssue: builder.mutation({
      query: (newIssue) => ({
        url: ISSUES_URL,
        method: "POST",
        body: newIssue,
      }),
    }),
    closeIssue: builder.mutation({
      query: (id) => ({
        url: `${ISSUES_URL}/${id}/close`,
        method: "PUT",
      }),
    }),
    // Additional endpoints can be added here
  }),
});

export const {
  useGetIssuesQuery,
  useCreateIssueMutation,
  useCloseIssueMutation,
  // Add any additional hooks as necessary
} = issuesApiSlice;
