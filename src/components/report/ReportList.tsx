import { useEffect, useState } from "react";
import ListLoading from "../loader/ListLoading";
import { Input } from "antd";
import { CiSearch } from "react-icons/ci";
import ReportTable from "./ReportTable";
import { useGetReportsQuery } from "../../redux/features/report/reportApi";


const ReportList = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const { data, isLoading, isFetching, isError } = useGetReportsQuery([
        { name: "page", value: currentPage },
        { name: "limit", value: pageSize },
        { name: "searchTerm", value: searchTerm }
    ]);

    //debounced handle
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setCurrentPage(1);
            setSearchTerm(searchQuery);
        }, 600);
        return () => clearTimeout(timeoutId); // cleanup for debounce
    }, [searchQuery]);


    const reports = data?.data || [];
    const meta = data?.meta || {};

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
                <h2 className="text-md md:text-xl font-semibold mb-5 md:mb-0 ">Report</h2>
                <div className=" w-[250px]">
                    <Input onChange={(e)=> setSearchQuery(e.target.value)} prefix={<CiSearch className=" w-6 h-6" />} className="w-[250px]" placeholder="Search" />
                </div>
            </div>
            <div className="mt-4">
                {content}
            </div>
        </>
    );
};

export default ReportList;