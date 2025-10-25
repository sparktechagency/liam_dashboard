/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from "../api/apiSlice.js";
import TagTypes from "../../../constant/tagType.constant.js";
import { ErrorToast, SuccessToast } from "../../../helper/ValidationHelper.js";

export const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStats: builder.query({
      query: () => {
        return {
          url: `/dashboards/total_counts`,
          method: "GET",
        };
      },
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.stats],
    }),
    getBookingStats: builder.query({
      query: () => {
        return {
          url: `/dashboards/get_booking_stats_by_category`,
          method: "GET",
        };
      },
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.bookingStats],
    }),
    getDailyBookings: builder.query({
      query: () => {
        return {
          url: `/dashboards/get_daily_booking`,
          method: "GET",
        };
      },
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.dailyBookings],
    }),
    getPercentage: builder.query({
      query: () => {
        return {
          url: `/auth/getPercent`,
          method: "GET",
        };
      },
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.percentage],
    }),
    createUpdateCost: builder.mutation({
      query: (data) => ({
        url: `/auth/create_update_cost`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.percentage];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast("Cost is updated successfully");
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

export const { useGetStatsQuery, useGetBookingStatsQuery, useGetDailyBookingsQuery, useGetPercentageQuery, useCreateUpdateCostMutation} = dashboardApi;
