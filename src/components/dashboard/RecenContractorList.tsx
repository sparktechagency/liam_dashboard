import { useGetUsersQuery } from "../../redux/features/user/userApi";
import RecentContractorTable from "./RecentContractorTable";
import RecentContractorLoading from "../loader/RecentContractorLoading";
import { Link } from "react-router-dom";


const RecenContractorList = () => {
    const { data, isLoading, isFetching, isError } = useGetUsersQuery([
        { name: "page", value: 1 },
        { name: "limit", value: 5 },
        { name: "role", value: "contractor"},
    ]);



    const contractors = data?.data || [];
    const meta = data?.meta || {};

    let content: React.ReactNode;


    if (isLoading) {
        content = <RecentContractorLoading />;
    }

    if (!isLoading && !isError) {
        content = <RecentContractorTable
            contractors={contractors}
            meta={meta}
            loading={isFetching}
        />;
    }

    if (!isLoading && isError) {
        content = <h1>Server Error Occured</h1>;
    }

    return (
        <>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center px-2 py-4 bg-white shadow mt-5 rounded">
                <h2 className="text-md md:text-xl font-semibold mb-5 md:mb-0 ">Recent Contractor Request</h2>
                <Link to="/contractor-manage">View All</Link>
            </div>
            <div className="">
                {content}
            </div>
        </>
    );
};

export default RecenContractorList;