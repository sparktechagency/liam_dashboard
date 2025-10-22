import { useState } from "react";
import ListLoading from "../loader/ListLoading";
import BannerTable from "./BannerTable";
import { useGetBannersQuery } from "../../redux/features/banner/bannerApi";
import AddBannerModal from "../modal/banner/AddBannerModal";


const BannerList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const { data, isLoading, isFetching, isError } = useGetBannersQuery(undefined);


    const banners = data?.data || [];
    const meta = data?.meta || {};

    let content: React.ReactNode;


    if (isLoading) {
        content = <ListLoading />;
    }

    if (!isLoading && !isError) {
        content = <BannerTable
            banners={banners}
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
                <h2 className="text-md md:text-xl font-semibold mb-5 md:mb-0 ">Banner List</h2>
                <AddBannerModal/>
            </div>
            <div className="mt-4">
                {content}
            </div>
        </>
    );
};

export default BannerList;