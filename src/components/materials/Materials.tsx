import { useState } from "react";
import ListLoading from "../loader/ListLoading";
import MaterialsTable from "./MaterialsTable";
import { useGetMaterialsQuery } from "../../redux/features/materials/materialsApi";


const Materials = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const { data, isLoading, isFetching, isError } = useGetMaterialsQuery([
        { name: "page", value: currentPage },
        { name: "limit", value: pageSize },
    ]);


    const materials = data?.data || [];
    const meta = data?.meta || {};

    let content: React.ReactNode;


    if (isLoading) {
        content = <ListLoading />;
    }

    if (!isLoading && !isError) {
        content = <MaterialsTable
            materials={materials}
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

export default Materials;