/* eslint-disable @typescript-eslint/no-unused-vars */
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
    getSingleContractor: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      keepUnusedDataFor: 600,
      providesTags: (_result, _error, arg) => [
        { type: TagTypes.contractor, id: arg },
      ],
    }),
    approveContractor: builder.mutation({
      query: ({userId, status}) => ({
        url: `/dashboards/approved_contactor?userId=${userId}&status=${status}`,
        method: "POST",
      }),
      invalidatesTags: (result, _success, arg) => {
        if (result?.success) {
          return [TagTypes.users, {type: TagTypes.contractor, id: arg.userId}];
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
    changeHomeContractor: builder.mutation({
      query: ({contractorId, status}) => ({
        url: `/dashboards/contractor_home?contractorId=${contractorId}&isHomeSelect=${status}`,
        method: "PATCH",
      }),
      invalidatesTags: (result, _success, arg) => {
        if (result?.success) {
          return [TagTypes.users, {type: TagTypes.contractor, id: arg.userId}];
        }
        return [];
      },
      async onQueryStarted({ status }, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast(`Contractor is ${status ? "visible" : "hidden"} successfully`);
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

export const { useGetContractorsQuery, useGetSingleContractorQuery, useApproveContractorMutation, useChangeHomeContractorMutation} = contractorApi;
