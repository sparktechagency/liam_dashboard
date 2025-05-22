/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, TableProps } from "antd";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import EditQuestion from "./EditQuestion";
import { useState } from "react";

type Idata = {
    id: number,
    questionAndAnswer: string,
    type: string,
}

const Questions = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const data: Idata[] = [
        {
            id: 1,
            questionAndAnswer: "How many dimmers do you need installed ?",
            type: "3 dimmers need installed ",
        },
        {
            id: 2,
            questionAndAnswer: "How many dimmers do you need installed ?",
            type: "3 dimmers need installed ",
        },
        {
            id: 3,
            questionAndAnswer: "How many dimmers do you need installed ?",
            type: "3 dimmers need installed ",
        },
        {
            id: 4,
            questionAndAnswer: "How many dimmers do you need installed ?",
            type: "3 dimmers need installed ",
        },
        {
            id: 5,
            questionAndAnswer: "How many dimmers do you need installed ?",
            type: "3 dimmers need installed ",
        },
    ]

    const columns: TableProps<Idata>['columns'] = [

        {
            title: "Question",
            dataIndex: "question",

            render: (_: any, record: Idata) => <span className="">{record?.questionAndAnswer}</span>,
        },
        // {
        //     title: "Type",
        //     dataIndex: "type",

        //     render: (_: any, record: Idata) => <span className=" border border-[#c5c5c5] px-3 py-[4px]">{record?.type}</span>,
        // },
        {
            title: "Action",
            dataIndex: "action",
            align: 'right',
            render: () =>
                <div className=" flex justify-end">
                    <div className=' flex items-center gap-2'>
                        <button onClick={showModal} className=" bg-primaryColor p-1 rounded cursor-pointer"><MdOutlineModeEdit className="w-6 h-6 text-white" /></button>
                        <button className=" bg-red-600 p-1 rounded cursor-pointer"><RiDeleteBin6Line className="w-6 h-6 text-white" /></button>
                    </div>
                </div>

        },
    ];

    return (
        <div>
            <Table
                columns={columns}
                className="mt-5 overflow-x-scroll xl:overflow-auto bg-white rounded-lg"
                dataSource={data}
                pagination={false}
                rowKey="_id"
            />
            <EditQuestion isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel}></EditQuestion>
        </div>
    );
};

export default Questions;