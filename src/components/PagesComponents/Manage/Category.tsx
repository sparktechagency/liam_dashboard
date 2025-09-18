import { useState } from "react";
import ListLoading from "../../loader/ListLoading";
import CategoryTable from "../../category/CategoryTable";
import { useGetCategoriesQuery } from "../../../redux/features/category/categoryApi";

const Category = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(2);
    const { data, isLoading, isFetching, isError } = useGetCategoriesQuery([
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
        content = <CategoryTable
            categories={categories}
            meta={meta}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            isFetching={isFetching}
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

export default Category;