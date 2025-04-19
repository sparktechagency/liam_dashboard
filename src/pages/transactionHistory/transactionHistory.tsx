/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pagination, Select, Table, TableProps } from "antd";
import { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { Link } from "react-router-dom";


const TransactionHistory = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const pageSize = 10;
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

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
        contractStartDate: string,
        contractorType: string,
        paymentType: string,
        amount: number,
        status: string,
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
                contractStartDate: "24/01/2023",
                contractorType: "Gold",
                paymentType: "Online Payment",
                amount: 750,
                status: "Paid",
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
                contractStartDate: "24/01/2023",
                contractorType: "Platinum",
                paymentType: "Online Payment",
                amount: 532,
                status: "Paid",
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
                contractStartDate: "24/01/2023",
                contractorType: "Dimond",
                paymentType: "Online Payment",
                amount: 150,
                status: "Paid",
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
                contractStartDate: "24/01/2023",
                contractorType: "Dimond",
                paymentType: "Online Payment",
                amount: 500,
                status: "Pending",
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
                contractStartDate: "24/01/2023",
                contractorType: "Dimond",
                paymentType: "Online Payment",
                amount: 1000,
                status: "Pending",
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
                contractStartDate: "24/01/2023",
                contractorType: "Dimond",
                paymentType: "Online Payment",
                amount: 1000,
                status: "Pending",
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
                contractStartDate: "24/01/2023",
                contractorType: "Dimond",
                paymentType: "Online Payment",
                amount: 1000,
                status: "Pending",
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
                contractStartDate: "24/01/2023",
                contractorType: "Dimond",
                paymentType: "Online Payment",
                amount: 1000,
                status: "Pending",
                role: "User",
            }
        ],
        meta: {
            limit: 10,
            total: 3,
        },
    };
    const columns: TableProps<UserData>['columns'] = [
        {
            title: "S No.",
            dataIndex: "id",
            render: (_: any, record: UserData) => <span>{record?._id}</span>,
        },
        {
            title: "Name",
            dataIndex: "name",
            render: (_: any, record: UserData) =>
                <div className=' flex items-center gap-2 w-[200px]'>
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
            title: "Contractor Type",
            dataIndex: "contractorType",
            render: (_: any, record: UserData) => <span>{record?.contractorType}</span>,
        },
        {
            title: "Date Of Payment",
            dataIndex: "contractStartDate",
            render: (_: any, record: UserData) => <span>{record?.contractStartDate}</span>,
        },
        {
            title: "Payment Type",
            dataIndex: "paymentType",
            render: (_: any, record: UserData) => <span>{record?.paymentType}</span>,
        },
        {
            title: "Payment Status",
            dataIndex: "status",
            render: (_: any, record: UserData) => <span>{record?.status}</span>,
        },
        {
            title: "Paid Amount",
            dataIndex: "amount",
            render: (_: any, record: UserData) => <span>${record?.amount}</span>,
        },
    ];

    return (
        <div className=" min-h-screen">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-5 ">
                <div className=" flex gap-3 items-center mb-4 md:mb-0">
                    <Link to={-1 as any}>
                        <IoArrowBack className=" w-8 h-8 cursor-pointer bg-accent text-black p-1 rounded-full" />
                    </Link>
                    <h2 className="text-md md:text-xl font-semibold ">Transaction History</h2>
                </div>
                <div className=" flex items-center gap-5">
                    <div>
                        <span>Month: </span>
                        <Select
                            placeholder="Select"
                            style={{ width: 100 }}
                            onChange={(value) => console.log("Selected month:", value)}
                        >
                            {[
                                "January",
                                "February",
                                "March",
                                "April",
                                "May",
                                "June",
                                "July",
                                "August",
                                "September",
                                "October",
                                "November",
                                "December",
                            ].map((month, index) => (
                                <Select.Option key={index} value={month}>
                                    {month}
                                </Select.Option>
                            ))}
                        </Select>
                    </div>
                    <div className="flex items-center gap-2">
                        <span>Year: </span>
                        <Select
                            placeholder="Select"
                            style={{ width: 100 }}
                            onChange={(value) => console.log("Selected year:", value)}
                        >
                            {Array.from({ length: 5 }, (_, i) => {
                                const year = new Date().getFullYear() - i;
                                return (
                                    <Select.Option key={year} value={year}>
                                        {year}
                                    </Select.Option>
                                );
                            })}
                        </Select>
                    </div>
                </div>
            </div>
            <Table
                columns={columns}
                className="mt-5 overflow-x-scroll xl:overflow-auto bg-white rounded-lg"
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

export default TransactionHistory;