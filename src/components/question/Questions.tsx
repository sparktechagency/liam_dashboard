import { useState } from "react";
import ListLoading from "../loader/ListLoading";
import QuestionTable from "./QuestionTable";
import { useGetQuestionsQuery } from "../../redux/features/question/questionApi";


const Questions = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const { data, isLoading, isFetching, isError } = useGetQuestionsQuery([
        { name: "page", value: currentPage },
        { name: "limit", value: pageSize },
    ]);


    const questions = data?.data || [];
    const meta = data?.meta || {};

    let content: React.ReactNode;


    if (isLoading) {
        content = <ListLoading />;
    }

    if (!isLoading && !isError) {
        content = <QuestionTable
            questions={questions}
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

export default Questions;