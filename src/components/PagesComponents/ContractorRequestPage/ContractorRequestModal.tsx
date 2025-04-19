import { Modal } from "antd";
import { MdTaskAlt } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

type AddSubscriptionModalProps = {
    isModalOpen: boolean;
    handleOk: () => void;
    handleCancel: () => void;
};

const ContractorRequestModal = ({ isModalOpen, handleOk, handleCancel }: AddSubscriptionModalProps) => {

    return (
        <Modal width={600} centered footer={false} title="" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <h2 className=" text-xl text-center font-semibold">Contaractor Application of Emon</h2>
            <div className=" mt-5">
                <div className=" bg-[#efe6ef] px-2 py-1 rounded flex items-center mb-4">
                    <p className=" w-1/2">Name</p>
                    <p>: TA Emon</p>
                </div>
                <div className=" bg-[#efe6ef] px-2 py-1 rounded flex items-center mb-4">
                    <p className=" w-1/2">Date of Birth</p>
                    <p>: 24/04/2002</p>
                </div>
                <div className=" bg-[#efe6ef] px-2 py-1 rounded flex items-center mb-4">
                    <p className=" w-1/2">Address</p>
                    <p>: Dhaka</p>
                </div>
                <div className=" bg-[#efe6ef] px-2 py-1 rounded flex items-center mb-4">
                    <p className=" w-1/2">Email</p>
                    <p>: emon@gmail.com</p>
                </div>
                <div className=" bg-[#efe6ef] px-2 py-1 rounded flex items-center mb-4">
                    <p className=" w-1/2">Phone Number</p>
                    <p>: +088123103451</p>
                </div>
                <div className=" bg-[#efe6ef] px-2 py-1 rounded flex items-center mb-4">
                    <p className=" w-1/2">Category</p>
                    <p>: Electrician</p>
                </div>
                <div className=" bg-[#efe6ef] px-2 py-1 rounded flex items-center mb-4">
                    <p className=" w-1/2">Skills</p>
                    <p>: : Switchboard Installation</p>
                </div>
                <div className=" bg-[#efe6ef] px-2 py-1 rounded flex items-center mb-4">
                    <p className=" w-1/2">Certificate</p>
                    <p>: PDF</p>
                </div>
                <div className=" bg-[#efe6ef] px-2 py-1 rounded flex items-center mb-4">
                    <p className=" w-1/2">Materials</p>
                    <p>: : Electrical Cable, Fan, Switchboard</p>
                </div>
                <div className=" bg-[#efe6ef] px-2 py-1 rounded flex items-center mb-4">
                    <p className=" w-1/2">Charge</p>
                    <p>: : Amount $/ Hour</p>
                </div>
            </div>
            <div className=" px-14 flex justify-between items-center">
                <button className=" bg-primaryColor text-white px-6 py-2 rounded mt-5 flex items-center gap-2 cursor-pointer"> <MdTaskAlt className=" w-6 h-6 text-white" /> Accept</button>
                <button className=" bg-red-500 text-white px-6 py-2 rounded mt-5 ml-3 flex items-center gap-2 cursor-pointer"> <RxCross2 className=" w-6 h-6 text-white" /> Reject</button>
            </div>
        </Modal>

    );
};

export default ContractorRequestModal;