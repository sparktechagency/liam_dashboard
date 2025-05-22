/* eslint-disable @typescript-eslint/no-unused-vars */
import { Input, Pagination, Table } from "antd";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { PiArrowBendUpLeftLight } from "react-icons/pi";
import ViewModal from "../../components/PagesComponents/Report/ViewModal";
import FeedbackModal from "../../components/PagesComponents/Report/FeedbackModal";

// interface Name {
//     firstName: string;
//     lastName: string;
// }

interface ReportData {
    slNo: string;
    date: string;
    userName: string;
    serviceId: string;
    subject: string;
    feedback: string;
    action: string;
}


interface UserMeta {
    limit: number;
    total: number;
}

interface UserDataSource {
    data: ReportData[];
    meta: UserMeta;
}


const Report = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isModalFeedbackOpen, setIsModalFeedbackOpen] = useState<boolean>(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const showFeedbackModal = () => {
        setIsModalFeedbackOpen(true);
    };
    const handleFeedbackOk = () => {
        setIsModalFeedbackOpen(false);
    };
    const handleFeedbackCancel = () => {
        setIsModalFeedbackOpen(false);
    };

    const pageSize = 10;
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // const onFinish = (values: any): void => {
    //     console.log(values);
    // };

    // User data
    const userData: UserDataSource = {
        data: [
            {
                slNo: "#12333",
                date: "12/05/2025",
                userName: "Hari Danang",
                serviceId: "AD6CHHR6",
                subject: "Electrical",
                feedback: "Reply",
                action: "View",
            },
            {
                slNo: "#12333",
                date: "12/05/2025",
                userName: "Floyd Miles",
                serviceId: "AD6CHHR6",
                subject: "Electrical",
                feedback: "Reply",
                action: "View",
            },
            {
                slNo: "#12333",
                date: "12/05/2025",
                userName: "Eleanor Pena",
                serviceId: "AD6CHHR6",
                subject: "Electrical",
                feedback: "Reply",
                action: "View",
            },
            {
                slNo: "#12333",
                date: "12/05/2025",
                userName: "Eleanor Pena",
                serviceId: "AD6CHHR6",
                subject: "Plumber",
                feedback: "Reply",
                action: "View",
            },
            {
                slNo: "#12333",
                date: "12/05/2025",
                userName: "Jacob Jones",
                serviceId: "AD6CHHR6",
                subject: "Plumber",
                feedback: "Reply",
                action: "View",
            },
            {
                slNo: "#12333",
                date: "12/05/2025",
                userName: "Jacob Jones",
                serviceId: "AD6CHHR6",
                subject: "Plumber",
                feedback: "Reply",
                action: "View",
            },
            {
                slNo: "#12333",
                date: "12/05/2025",
                userName: "Jacob Jones",
                serviceId: "AD6CHHR6",
                subject: "Painter",
                feedback: "Reply",
                action: "View",
            },
            {
                slNo: "#12333",
                date: "12/05/2025",
                userName: "Jacob Jones",
                serviceId: "AD6CHHR6",
                subject: "Painter",
                feedback: "Reply",
                action: "View",
            },
            {
                slNo: "#12333",
                date: "12/05/2025",
                userName: "Jacob Jones",
                serviceId: "AD6CHHR6",
                subject: "Cleaner",
                feedback: "Reply",
                action: "View",
            },
        ],
        meta: {
            limit: 10,
            total: 9,
        },
    };


    // Define columns with types
    const columns = [
        {
            title: "SL no.",
            dataIndex: "slNo",
            key: "slNo",
            render: (text: string) => <span>{text}</span>,
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            render: (text: string) => <span>{text}</span>,
        },
        {
            title: "User Name",
            dataIndex: "userName",
            key: "userName",
            render: (text: string) => <span>{text}</span>,
        },
        {
            title: "Service ID",
            dataIndex: "serviceId",
            key: "serviceId",
            render: (text: string) => <span>{text}</span>,
        },
        {
            title: "Subject",
            dataIndex: "subject",
            key: "subject",
            render: (text: string) => <span>{text}</span>,
        },
        {
            title: "Feedback",
            dataIndex: "feedback",
            key: "feedback",
            render: () => (
                <div onClick={showFeedbackModal} className="flex items-center gap-1.5 cursor-pointer ">
                    <span>Reply</span>
                    <PiArrowBendUpLeftLight size={20} />
                </div>
            ),
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            render: () => (
                <p onClick={showModal} className="cursor-pointer">
                    View
                </p>
            ),
        },
    ];



    return (
        <div className="  min-h-[100vh]">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-5">
                <h2 className="text-md md:text-xl font-semibold mb-5 md:mb-0 ">Report</h2>
                <div className=" w-[250px]">
                    <Input prefix={<CiSearch className=" w-6 h-6" />} className="w-[250px]" placeholder="Search" />
                </div>
            </div>
            <Table
                columns={columns}
                className="mt-5 overflow-x-scroll xl:overflow-auto bg-white rounded-lg"
                dataSource={userData?.data}
                pagination={false}
                rowKey="_id"
            />
            <ViewModal isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel}></ViewModal>
            <FeedbackModal isModalOpen={isModalFeedbackOpen} handleOk={handleFeedbackOk} handleCancel={handleFeedbackCancel}></FeedbackModal>
            <div className=" mt-8 flex flex-col md:flex-row justify-between items-center">
                <div>
                    <p className=" text-lg text-black mb-5 md:mb-0">Showing 1-11 out of  1239</p>
                </div>

                <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={50}
                    onChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default Report;
