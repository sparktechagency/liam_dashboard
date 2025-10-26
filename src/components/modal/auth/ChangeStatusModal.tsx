import { Modal } from "antd";
import { useEffect, useState } from "react";
import { useChangeStatusMutation } from "../../../redux/features/auth/authApi";
import DeleteButton from "../../form/DeleteButton";
import { MdOutlineBlock } from "react-icons/md";
import { BsFillStopCircleFill } from "react-icons/bs";

type TProps = {
  userId: string;
  status: string;
}

const ChangeStatusModal = ({ userId, status }: TProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [changeStatus, { isLoading, isSuccess }] = useChangeStatusMutation();

  useEffect(() => {
    if (isSuccess) {
      setModalOpen(false);
    }
  }, [isSuccess]);


  const handleClick = () => {
    changeStatus({
      id: userId,
      data: {
        status: status === "blocked" ? "active" : "blocked"
      }
    });
  };

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className={`inline-flex items-center gap-2 px-4 py-1 rounded-2xl font-medium transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer ${status === "blocked"
            ? "bg-red-50 text-red-700 hover:bg-red-100 focus:ring-red-300"
            : "bg-green-50 text-green-700 hover:bg-green-100 focus:ring-green-300"
          }`}
      >
        {status === "blocked" ? (
          <>
            <MdOutlineBlock className="w-4 h-4" />
            <span>Blocked</span>
          </>
        ) : (
          <>
            <BsFillStopCircleFill className="w-4 h-4" />
            <span>Active</span>
          </>
        )}
      </button>

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
