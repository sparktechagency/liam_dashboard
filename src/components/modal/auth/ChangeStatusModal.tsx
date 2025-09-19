import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import { useChangeStatusMutation } from "../../../redux/features/auth/authApi";
import DeleteButton from "../../form/DeleteButton";
import { MdOutlineBlock } from "react-icons/md";
import { BsFillStopCircleFill } from "react-icons/bs";

type TProps ={
  userId:string;
  status: string;
}

const ChangeStatusModal = ({ userId, status }: TProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [ changeStatus, { isLoading, isSuccess }] = useChangeStatusMutation();

  useEffect(() => {
    if (isSuccess) {
      setModalOpen(false);
    }
  }, [isSuccess]);


 const handleClick = () => {
   changeStatus({
     id: userId,
     data : {
      status: status==="blocked" ? "active" : "blocked"
     }
   });
 };

  return (
    <>
      <Button
        type="text"
        className="w-fit px-2"
        onClick={() => {
          setModalOpen(true);
        }}
      >
        {status === "active" ?
          <BsFillStopCircleFill size={20} className="text-green-400" />
          :
          <MdOutlineBlock size={20} className="text-red-400 " />
        }
      </Button>
      <Modal
        title={`Are you sure, you want to ${status === "blocked" ? "active" : "block"}?`}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        maskClosable={false}
        footer={false}
        closable={false}
      >
        <div className="flex justify-end px-4 gap-x-3">
          <button onClick={() => setModalOpen(false)} className="bg-black cursor-pointer text-white px-4 py-2 rounded-md">No</button>
          <DeleteButton isLoading={isLoading} onClick={handleClick} />
        </div>
      </Modal>
    </>
  );
};

export default ChangeStatusModal;
