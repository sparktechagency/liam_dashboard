/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pagination, Table } from "antd";
import { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { Link } from "react-router-dom";

interface Name {
    firstName: string;
    lastName: string;
}

interface UserData {
    _id: string;
    name: Name;
    email: string;
    number: number,
    location: string,
    role: string;
}

interface UserMeta {
    limit: number;
    total: number;
}

interface UserDataSource {
    data: UserData[];
    meta: UserMeta;
}


const ContractorRequestPage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    console.log(currentPage);
    const pageSize = 10;
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const onFinish = (values: any): void => {
        console.log(values);
    };

    // User data
    const userData: UserDataSource = {
        data: [
            {
                _id: "1",
                name: {
                    firstName: "John",
                    lastName: "Doe",
                },
                email: "john.doe@example.com",
                number: 8852215615,
                location: "Dkaka, Bangladesh",
                role: "User",
            },
            {
                _id: "2",
                name: {
                    firstName: "Jane",
                    lastName: "Smith",
                },
                email: "jane.smith@example.com",
                number: 88452215615,
                location: "Dkaka, Bangladesh",
                role: "User",
            },
            {
                _id: "3",
                name: {
                    firstName: "Michael",
                    lastName: "Johnson",
                },
                email: "michael.johnson@example.com",
                number: 8852215615,
                location: "Dkaka, Bangladesh",
                role: "User",
            },
            {
                _id: "4",
                name: {
                    firstName: "Michael",
                    lastName: "Johnson",
                },
                email: "michael.johnson@example.com",
                number: 8852215615,
                location: "Dkaka, Bangladesh",
                role: "User",
            },
            {
                _id: "5",
                name: {
                    firstName: "Michael",
                    lastName: "Johnson",
                },
                email: "michael.johnson@example.com",
                number: 8852215615,
                location: "Dkaka, Bangladesh",
                role: "User",
            },
            {
                _id: "6",
                name: {
                    firstName: "Michael",
                    lastName: "Johnson",
                },
                email: "michael.johnson@example.com",
                number: 8852215615,
                location: "Dkaka, Bangladesh",
                role: "User",
            },
            {
                _id: "7",
                name: {
                    firstName: "Michael",
                    lastName: "Johnson",
                },
                email: "michael.johnson@example.com",
                number: 8852215615,
                location: "Dkaka, Bangladesh",
                role: "User",
            },
            {
                _id: "8",
                name: {
                    firstName: "Michael",
                    lastName: "Johnson",
                },
                email: "michael.johnson@example.com",
                number: 8852215615,
                location: "Dkaka, Bangladesh",
                role: "User",
            },
        ],
        meta: {
            limit: 10,
            total: 3,
        },
    };

    // Define columns with types
    const columns = [
        {
            title: "S No.",
            dataIndex: "id",
            render: (_: any, record: UserData) => <span>{record?._id}</span>,
        },
        {
            title: "Name",
            dataIndex: "name",
            render: (_: any, record: UserData) =>
                <div className=' flex items-center gap-2'>
                    <img
                        src={`https://avatar.iran.liara.run/public/${record?._id}`}
                        alt=""
                        className="w-10 h-10 rounded-full mr-2"
                    />
                    <div>
                        <span>{record?.name?.firstName} {record?.name?.lastName}</span>
                    </div>
                </div>,
        },
        {
            title: "Email",
            dataIndex: "email",
            render: (_: any, record: UserData) => <span>{record?.email}</span>,
        },
        {
            title: "Contact Number",
            dataIndex: "number",
            render: (_: any, record: UserData) => <span>{record?.number}</span>,
        },
        {
            title: "Location",
            dataIndex: "location",
            render: (_: any, record: UserData) => <span>{record?.location}</span>,
        },
        {
            title: "Action",
            render: (_: any, record: UserData) => (
                <div className="flex items-center">
                    <button className=" cursor-pointer">View</button>
                </div>
            ),
        },
    ];

    return (
        <div className=" min-h-screen">
            <div className="flex gap-3 items-center mt-5">
                <Link to={-1 as any}>
                    <IoArrowBack className=" w-8 h-8 cursor-pointer bg-accent text-black p-1 rounded-full" />
                </Link> <h2 className="text-md md:text-xl font-semibold ">Contractor Request</h2>
            </div>
            <Table
                columns={columns}
                className="mt-5 overflow-x-scroll xl:overflow-auto w-full bg-white rounded-lg"
                dataSource={userData?.data}
                pagination={false}
                rowKey="_id"
            />
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

export default ContractorRequestPage;
