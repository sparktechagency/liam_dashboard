/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, TableProps } from "antd";
import { useState } from "react";
import AddSubscriptionModal from "../../components/PagesComponents/Subscription/AddSubscriptionModal";
import EditSubscriptionModal from "../../components/PagesComponents/Subscription/EditSubscriptionModal";

type SubscriptionPlan = {
    slNo: number;
    subscriptionPlan: string;
    price: string;
    duration: string;
    contractorFeePerMonth: number;
};


const Subscriptions: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const showEditModal = () => {
        setIsEditModalOpen(true);
    };
    const handleEditOk = () => {
        setIsEditModalOpen(false);
    };
    const handleEditCancel = () => {
        setIsEditModalOpen(false);
    };


    // const onFinish = (values: any): void => {
    //     console.log(values);
    // };

    const userData: SubscriptionPlan[] = [
        {
            "slNo": 1,
            "subscriptionPlan": "Gold",
            "price": "$19.99",
            "duration": "Month",
            "contractorFeePerMonth": 20
        },
        {
            "slNo": 2,
            "subscriptionPlan": "Platinum",
            "price": "$19.99",
            "duration": "06 Month",
            "contractorFeePerMonth": 20,
        },
        {
            "slNo": 3,
            "subscriptionPlan": "Diamond",
            "price": "$19.99",
            "duration": "Yearly",
            "contractorFeePerMonth": 20,
        }
    ]

    const columns: TableProps<SubscriptionPlan>['columns'] = [
        {
            title: "S No.",
            dataIndex: "slNo",
            render: (_: any, record: SubscriptionPlan) => <span>{record?.slNo}</span>,
        },
        {
            title: "Subscription Plan",
            dataIndex: "subscriptionPlan",
            render: (_: any, record: SubscriptionPlan) => <span>{record?.subscriptionPlan}</span>,
        },
        {
            title: "Price",
            dataIndex: "price",
            render: (_: any, record: SubscriptionPlan) => <span>{record?.price}</span>,
        },
        {
            title: "Duration",
            dataIndex: "duration",
            render: (_: any, record: SubscriptionPlan) => <span>{record?.duration}</span>,
        },
        {
            title: "Contractor Fee Per Month",
            dataIndex: "Contractor Fee Per Month",
            render: (_: any, record: SubscriptionPlan) => <span>{record?.contractorFeePerMonth}%</span>,
        },
        {
            title: "Action",
            render: () => (
                <div className="flex items-center">
                    <button onClick={showEditModal} className=" text-primaryColor cursor-pointer">
                        Edit
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className=" min-h-screen">
            <div className="flex justify-between items-center mt-5">
                <h2 className="text-md md:text-xl font-semibold ">Subscription</h2>
                <div>
                    <button
                        onClick={showModal}
                        className="rounded-lg font-semibold cursor-pointer bg-primaryColor text-white px-3 py-2"
                    >
                        Add Subscription
                    </button>
                    <AddSubscriptionModal isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel}></AddSubscriptionModal>
                </div>
            </div>
            <Table
                columns={columns}
                className="mt-5 overflow-x-scroll xl:overflow-auto w-full bg-white rounded-lg"
                dataSource={userData}
                pagination={false}
                rowKey="_id"
            />
            <EditSubscriptionModal isModalOpen={isEditModalOpen} handleOk={handleEditOk} handleCancel={handleEditCancel}></EditSubscriptionModal>
        </div>
    );
};

export default Subscriptions;
