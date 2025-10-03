/* eslint-disable @typescript-eslint/no-explicit-any */

import TagTypes from "../../../constant/tagType.constant";
import { ErrorToast, SuccessToast } from "../../../helper/ValidationHelper";
import type { IParam } from "../../../types/global.type";
import { apiSlice } from "../api/apiSlice";
import { SetSubCategoryCreateError, SetSubCategoryUpdateError } from "./subCategorySlice";

export const subCategoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSubCategories: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args !== undefined && args.length > 0) {
          args.forEach((item: IParam) => {
            if (item.value) {
              params.append(item.name, item.value);
            }
          });
        }
        return {
          url: "/sub-categories",
          method: "GET",
          params: params,
        };
      },
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.subCategories],
    }),
    createSubCategory: builder.mutation({
      query: (data) => ({
        url: "/sub-categories/create-sub-category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.subCategories];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          SuccessToast("Sub Category is added successfully");
        } catch (err: any) {
          const status = err?.error?.status;
          const message = err?.error?.data?.message || "Something Went Wrong";
          if (status === 500) {
            dispatch(SetSubCategoryCreateError("Something Went Wrong"));
          }
          else {
            dispatch(SetSubCategoryCreateError(message));
          }
        }
      },
    }),
    updateSubCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/category/update-category/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.subCategories, TagTypes.categoryDropDown];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          SuccessToast("Sub Category is updated successfully");
        } catch (err: any) {
          const status = err?.error?.status;
          const message = err?.error?.data?.message || "Something Went Wrong";
          if (status === 500) {
            dispatch(SetSubCategoryUpdateError("Something Went Wrong"));
          }
          else {
            dispatch(SetSubCategoryUpdateError(message));
          }
        }
      },
    }),
    deleteSubCategory: builder.mutation({
      query: (id) => ({
        url: `/sub-categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.subCategories, TagTypes.categoryDropDown];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast("Sub Category is deleted successfully");
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

export const { useGetSubCategoriesQuery, useCreateSubCategoryMutation, useDeleteSubCategoryMutation, useUpdateSubCategoryMutation } = subCategoryApi;
