/* eslint-disable @typescript-eslint/no-explicit-any */
import TagTypes from "../../../constant/tagType.constant";
import { ErrorToast, SuccessToast } from "../../../helper/ValidationHelper";
import { apiSlice } from "../api/apiSlice";

export type TPolicyType = "privacy-policy" | "about-us" |  "terms-condition" | "help";


export const policyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPrivacyPolicy: builder.query({
      query: () => {
        return {
          url: `/privacies`,
          method: "GET",
        };
      },
      keepUnusedDataFor: 600,
      providesTags: [ TagTypes.privacy ],
    }),
    createUpdatePrivacy: builder.mutation({
      query: (data) => ({
        url: `/privacies/create-privacy`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.privacy];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast(`Update Success`);
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
    getTerms: builder.query({
      query: () => {
        return {
          url: `/terms`,
          method: "GET",
        };
      },
      keepUnusedDataFor: 600,
      providesTags: [ TagTypes.terms ],
    }),
    createUpdateTerms: builder.mutation({
      query: (data) => ({
        url: `/terms/create-term`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.terms];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast(`Update Success`);
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
    })
  }),
});

export const {
  useGetPrivacyPolicyQuery,
  useCreateUpdatePrivacyMutation,
  useGetTermsQuery,
  useCreateUpdateTermsMutation
} = policyApi;
