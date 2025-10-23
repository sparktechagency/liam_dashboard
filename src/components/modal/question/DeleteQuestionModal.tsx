import { Modal } from "antd";
import { useEffect, useState } from "react";
import DeleteButton from "../../form/DeleteButton";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDeleteQuestionMutation } from "../../../redux/features/question/questionApi";

type TProps = {
  questionId: string;
};

const DeleteQuestionModal = ({ questionId }: TProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteQuestion, { isLoading, isSuccess }] =
    useDeleteQuestionMutation();

  useEffect(() => {
    if (!isLoading) {
      setModalOpen(false);
    }
  }, [isLoading, isSuccess]);


  const handleDelete = () => {
    deleteQuestion(questionId);
  };

  return (
    <>
      <button onClick={()=>setModalOpen(true)} className=" bg-red-600 p-1 rounded cursor-pointer"><RiDeleteBin6Line className="w-6 h-6 text-white" /></button>
      <Modal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        maskClosable={false}
        footer={false}
        closable={false}
      >
        <div className="rounded-md">
          <div className="">
            <div className="flex justify-between items-center">
              <h3 className="text-lg sm:text-xl font-semibold">
                Are you sure, you want to delete?
              </h3>
            </div>
          </div>
          <div>
            <div className="flex justify-end space-x-2 pt-3">
              <button
                onClick={() => setModalOpen(false)}
                className="bg-black text-white cursor-pointer px-4 py-2 rounded-md"
              >
                No
              </button>
             <DeleteButton isLoading={isLoading} onClick={handleDelete}/>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteQuestionModal;
