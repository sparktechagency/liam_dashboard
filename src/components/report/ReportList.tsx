import { useState } from "react";
import ListLoading from "../loader/ListLoading";
import ReportTable from "./ReportTable";
import { useGetReportsQuery } from "../../redux/features/report/reportApi";


const ReportList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const { data, isLoading, isFetching, isError } = useGetReportsQuery([
        { name: "page", value: currentPage },
        { name: "limit", value: pageSize },
    ]);


    const reports = data?.data?.data || [];
    console.log(reports)
    const meta = data?.data?.meta || {};

    let content: React.ReactNode;


    if (isLoading) {
        content = <ListLoading />;
    }

    if (!isLoading && !isError) {
        content = <ReportTable
            reports={reports}
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
                <h2 className="text-md md:text-xl font-semibold mb-5 md:mb-0 "> Help & Support </h2>
            </div>
            <div className="mt-4">
                {content}
            </div>
        </>
    );
};

export default ReportList;