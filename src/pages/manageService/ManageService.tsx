/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pagination, Select, Table, TableProps } from "antd";
import { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { Link } from "react-router-dom";

const ManageService = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const pageSize = 10;
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    type dataType = {
        id: number;
        name: string;
        status: string;
        category: string;
        payment: string;
    }

    const data: dataType[] = [
        {
            id: 1,
            name: "John Doe",
            status: "Active",
            category: "Electrical",
            payment: "Complete",
        },
        {
            id: 2,
            name: "Jane Smith",
            status: "Inprogress",
            category: "Electrical",
            payment: "Inprogress",
        },
        {
            id: 3,
            name: "John Doe",
            status: "Upcomming",
            category: "Plumber",
            payment: "Unpaid",
        },
        {
            id: 4,
            name: "John Doe",
            status: "Active",
            category: "Electrical",
            payment: "Complete",
        },
        {
            id: 5,
            name: "Michael Johnson",
            status: "Inprogress",
            category: "Painter",
            payment: "Unpaid",
        },
        {
            id: 6,
            name: "John Doe",
            status: "Upcomming",
            category: "Electrical",
            payment: "Complete",
        },
        {
            id: 7,
            name: "Michael Johnson",
            status: "Inprogress",
            category: "Painter",
            payment: "Unpaid",
        },
        {
            id: 8,
            name: "John Doe",
            status: "Upcomming",
            category: "Electrical",
            payment: "Complete",
        },
    ]

    const columns: TableProps<dataType>['columns'] = [
        {
            title: "S No.",
            dataIndex: "id",
            render: (_: any, record: dataType) => <p>{record?.id}</p>,
        },
        {
            title: "Contractor Name",
            dataIndex: "name",
            render: (_: any, record: dataType) =>
                <div className=' flex items-center gap-2 w-[200px]'>
                    <img
                        src={`https://avatar.iran.liara.run/public/${record?.id}`}
                        alt=""
                        className="w-10 h-10 rounded-full mr-2"
                    />
                    <div>
                        <span>{record?.name}</span>
                    </div>
                </div>,
        },
        {
            title: "Customer Name",
            dataIndex: "name",
            render: (_: any, record: dataType) =>
                <div className=' flex items-center gap-2 w-[200px]'>
                    <img
                        src={`https://avatar.iran.liara.run/public/${record?.id}`}
                        alt=""
                        className="w-10 h-10 rounded-full mr-2"
                    />
                    <div>
                        <span>{record?.name}</span>
                    </div>
                </div>,
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (_: any, record: dataType) => {
                return record?.status === "Active" ? (
                    <span className="text-green-500 font-semibold">{record?.status}</span>
                ) : record?.status === "Inprogress" ? (
                    <span className="text-[#5E095E] font-semibold">{record?.status}</span>
                ) : record?.status === "Upcomming" ? (
                    <span className="text-[#CDB3CD] font-semibold">{record?.status}</span>
                ) : (
                    <span className="text-gray-500 font-semibold">{record?.status}</span>
                );
            },
        },
        {
            title: "Category",
            dataIndex: "category",
            render: (_: any, record: dataType) => <span>{record?.category}</span>,
        },
        {
            title: "Payment",
            dataIndex: "payment",
            render: (_: any, record: dataType) => {
                return record?.payment === "Complete" ? (
                    <span className="text-green-500 font-semibold">{record?.payment}</span>
                ) : record?.payment === "Inprogress" ? (
                    <span className="text-[#5E095E] font-semibold">{record?.payment}</span>
                ) : (
                    <span className="text-[#CDB3CD] font-semibold">{record?.payment}</span>
                )
            },
        },
        {
            title: "Hold",
            dataIndex: "hold",
            render: () => <div>
                <button className=" bg-primaryColor rounded px-4 py-1 text-white cursor-pointer">Hold</button>
            </div>,
        }
    ];

    return (
        <div className=" min-h-screen">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-5 ">
                <div className=" flex gap-3 items-center mb-4 md:mb-0">
                    <Link to={-1 as any}>
                        <IoArrowBack className=" w-8 h-8 cursor-pointer bg-accent text-black p-1 rounded-full" />
                    </Link>
                    <h2 className="text-md md:text-xl font-semibold ">Manage Service</h2>
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
                dataSource={data}
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

export default ManageService;