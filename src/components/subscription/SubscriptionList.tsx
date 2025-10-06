import { useState } from "react";
import ListLoading from "../loader/ListLoading";
import SubscriptionTable from "./SubscriptionTable";
import CreateSubscriptionModal from "../modal/subscription/CreateSubscriptionModal";
import { useGetSubscriptionsQuery } from "../../redux/features/subscription/subscriptionApi";


const SubscriptionList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const { data, isLoading, isFetching, isError } = useGetSubscriptionsQuery([
        { name: "page", value: currentPage },
        { name: "limit", value: pageSize },
        { name: "role", value: "contractor"},
    ]);




    const subscriptions = data?.data || [];
    const meta = data?.meta || {};

    let content: React.ReactNode;


    if (isLoading) {
        content = <ListLoading />;
    }

    if (!isLoading && !isError) {
        content = <SubscriptionTable
            subscriptions={subscriptions}
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
                <h2 className="text-md md:text-xl font-semibold mb-5 md:mb-0 ">Subscription Plans</h2>
                <CreateSubscriptionModal/>
            </div>
            <div className="mt-4">
                {content}
            </div>
        </>
    );
};

export default SubscriptionList;