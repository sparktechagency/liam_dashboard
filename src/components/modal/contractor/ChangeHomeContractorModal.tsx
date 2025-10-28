import { Modal } from "antd";
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import DeleteButton from "../../form/DeleteButton";
import { useChangeHomeContractorMutation } from "../../../redux/features/contractor/contractorApi";

type TProps ={
  contractorId:string;
  status: boolean;
}

const ChangeHomeContractorModal = ({ contractorId, status }: TProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [ changeStatus, { isLoading, isSuccess }] = useChangeHomeContractorMutation();

  useEffect(() => {
    if (isSuccess) {
      setModalOpen(false);
    }
  }, [isSuccess]);


 const handleClick = () => {
   changeStatus({
    contractorId,
    status: status ? false : true
   });
 };

  return (
    <>
      <button
        className="p-1 bg-gray-100 cursor-pointer hover:bg-gray-200 text-gray-700 rounded-full"
        onClick={() => {
          setModalOpen(true);
        }}
      >
        <FiEdit size={14} />
      </button>
      <Modal
        title={`Are you sure, you want to ${status ? "hide" : "visible"}?`}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        maskClosable={false}
        footer={false}
        closable={false}
      >
        <div className="flex justify-end px-4 gap-x-3">
          <button onClick={()=>setModalOpen(false)} className="bg-black text-white px-4 py-1 rounded-md">No</button>
          <DeleteButton onClick={handleClick} isLoading={isLoading}/>
        </div>
      </Modal>
    </>
  );
};

export default ChangeHomeContractorModal;
