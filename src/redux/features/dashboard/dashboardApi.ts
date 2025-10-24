import { apiSlice } from "../api/apiSlice.js";
import TagTypes from "../../../constant/tagType.constant.js";

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
  }),
});

export const { useGetStatsQuery, useGetBookingStatsQuery, useGetDailyBookingsQuery} = dashboardApi;
