/* eslint-disable @typescript-eslint/no-explicit-any */

import TagTypes from "../../../constant/tagType.constant";
import { ErrorToast, SuccessToast } from "../../../helper/ValidationHelper";
import { apiSlice } from "../api/apiSlice";
import { SetQuestionCreateError, SetQuestionUpdateError } from "./questionSlice";

export const questionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuestions: builder.query({
      query: () => {
        return {
          url: "/questions",
          method: "GET",
        };
      },
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.questions],
    }),
    createQuestion: builder.mutation({
      query: (data) => ({
        url: "/questions/create-question",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.questions];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          SuccessToast("Question is added successfully");
        } catch (err: any) {
          const status = err?.error?.status;
          const message = err?.error?.data?.message || "Something Went Wrong";
          if (status === 500) {
            dispatch(SetQuestionCreateError("Something Went Wrong"));
          }
          else {
            dispatch(SetQuestionCreateError(message));
          }
        }
      },
    }),
    updateQuestion: builder.mutation({
      query: ({ id, data }) => ({
        url: `/subscriptions/plans/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.subscriptions];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          SuccessToast("Subscription is updated successfully");
        } catch (err: any) {
          const status = err?.error?.status;
          const message = err?.error?.data?.message || "Something Went Wrong";
          if (status === 500) {
            dispatch(SetQuestionUpdateError("Something Went Wrong"));
          }
          else {
            dispatch(SetQuestionUpdateError(message));
          }
        }
      },
    }),
    deleteQuestion: builder.mutation({
      query: (id) => ({
        url: `/question/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.subscriptions];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast("Question is deleted successfully");
        } catch (err: any) {
          const status = err?.error?.status;
          const message = err?.error?.data?.message || "Something Went Wrong";
          if (status === 500) {
            ErrorToast("Something Went Wrong");
          }
          else {
            ErrorToast(message);
          }
        }
      },
    }),
  }),
});

export const { useGetQuestionsQuery, useCreateQuestionMutation, useDeleteQuestionMutation, useUpdateQuestionMutation } = questionApi;
