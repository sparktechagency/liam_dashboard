import { useState } from "react";
import ListLoading from "../loader/ListLoading";
import WithdrawTable from "./WithdrawTable";
import { useGetWithdrawListQuery } from "../../redux/features/transaction/transactionApi";


const WithdrawList = () => {
    const [status, setStatus] = useState("")
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const { data, isLoading, isFetching, isError } = useGetWithdrawListQuery([
        { name: "page", value: currentPage },
        { name: "limit", value: pageSize },
        { name: "status", value: status }
    ]);



    const withdraws = data?.data?.withdrawals || [];
    const meta = data?.data?.meta || {};

    let content: React.ReactNode;


    if (isLoading) {
        content = <ListLoading />;
    }

    if (!isLoading && !isError) {
        content = <WithdrawTable
            withdraws={withdraws}
            meta={meta}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            loading={isFetching}
        />;
    }

    if (!isLoading && isError) {
        content = <h1>Server Error Occured</h1>;
    }

    return (
        <>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-5">
                <h2 className="text-md md:text-xl font-semibold mb-5 md:mb-0 ">Withdraw List</h2>
                <div className="flex flex-col space-y-1 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-3">
                    <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Filter by Status:</label>
                    <select
                        className="w-full sm:w-auto min-w-[140px] px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        value={status}
                        onChange={(e) => {
                            setStatus(e.target.value)
                            setCurrentPage(1)
                        }}
                    >
                        <option value="">All Status</option>
                        <option value="received">Received</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>
            </div>
            <div className="mt-4">
                {content}
            </div>
        </>
    );
};

export default WithdrawList;