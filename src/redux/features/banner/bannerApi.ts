/* eslint-disable @typescript-eslint/no-explicit-any */

import TagTypes from "../../../constant/tagType.constant";
import { ErrorToast, SuccessToast } from "../../../helper/ValidationHelper";
import type { IParam } from "../../../types/global.type";
import { apiSlice } from "../api/apiSlice";
import { SetBannerCreateError, SetBannerUpdateError } from "./bannerSlice";

export const bannerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBanners: builder.query({
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
          url: "/dashboards/banners",
          method: "GET",
          params: params,
        };
      },
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.banners],
    }),
    createBanner: builder.mutation({
      query: (data) => ({
        url: "/dashboards/create_banner",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.banners];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          SuccessToast("Banner is added successfully");
        } catch (err: any) {
          const status = err?.error?.status;
          const message = err?.error?.data?.message || "Something Went Wrong";
          if (status === 500) {
            dispatch(SetBannerCreateError("Something Went Wrong"));
          }
          else {
            dispatch(SetBannerCreateError(message));
          }
        }
      },
    }),
    updateBanner: builder.mutation({
      query: ({ id, data }) => ({
        url: `/dashboards/update_banner/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.banners];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          SuccessToast("Banner is updated successfully");
        } catch (err: any) {
          const status = err?.error?.status;
          const message = err?.error?.data?.message || "Something Went Wrong";
          if (status === 500) {
            dispatch(SetBannerUpdateError("Something Went Wrong"));
          }
          else {
            dispatch(SetBannerUpdateError(message));
          }
        }
      },
    }),
    deleteBanner: builder.mutation({
      query: (id) => ({
        url: `/dashboards/delete_banner/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.banners];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast("Banner is deleted successfully");
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

export const { useGetBannersQuery, useCreateBannerMutation, useUpdateBannerMutation, useDeleteBannerMutation } = bannerApi;
