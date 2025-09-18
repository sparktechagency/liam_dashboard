import { useState } from "react";
import ListLoading from "../loader/ListLoading";
import SubCategoryTable from "./SubCategoryTable";
import { useGetSubCategoriesQuery } from "../../redux/features/subCategory/subCategoryApi";


const SubCategory = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const { data, isLoading, isFetching, isError } = useGetSubCategoriesQuery([
        { name: "page", value: currentPage },
        { name: "limit", value: pageSize },
    ]);


    const categories = data?.data || [];
    const meta = data?.meta || {};

    let content: React.ReactNode;


    if (isLoading) {
        content = <ListLoading />;
    }

    if (!isLoading && !isError) {
        content = <SubCategoryTable
            categories={categories}
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
        <div className="mt-4">
            {content}
        </div>
    );
};

export default SubCategory;