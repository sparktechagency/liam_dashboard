/* eslint-disable @typescript-eslint/no-explicit-any */

import TagTypes from "../../../constant/tagType.constant";
import { ErrorToast, SuccessToast } from "../../../helper/ValidationHelper";
import type { IParam } from "../../../types/global.type";
import { apiSlice } from "../api/apiSlice";

export const contractorApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getContractors: builder.query({
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
          url: "/contractors",
          method: "GET",
          params: params,
        };
      },
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.contractors],
    }),
    approveContractor: builder.mutation({
      query: ({userId, status}) => ({
        url: `/dashboards/approved_contactor?userId=${userId}&status=${status}`,
        method: "DELETE",
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.contractors];
        }
        return [];
      },
      async onQueryStarted({ status }, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast(`Contractor is ${status} successfully`);
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

export const { useGetContractorsQuery, useApproveContractorMutation} = contractorApi;
