import { Modal } from "antd";
import { useState } from "react";
import { Eye } from "lucide-react";
import { IHelpDataSource } from "../../../types/help.type";

type TProps = {
  contact: IHelpDataSource
}

const ViewContactModal = ({ contact }: TProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="bg-gray-600 cursor-pointer hover:bg-gray-700 p-2 text-white rounded-full"
      >
        <Eye size={18} />
      </button>
      <Modal
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
        }}
        maskClosable={false}
        footer={false}
      >
        <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Subject */}
        <div className="bg-linear-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Title: {contact?.title}</h2>
        </div>
        {/* Original Message */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Message
            </span>
          </div>
          <div className="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-4">
            <p className="text-gray-800 leading-relaxed">
             {contact?.details}
            </p>
          </div>
        </div>

        {/* Reply Message */}
        <div className="p-6 bg-gray-50">
          <div className="ml-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Reply
              </span>
            </div>
            <div className={`${contact?.adminMessage ? 'border-green-400 bg-green-50' : 'bg-red-50 border-red-400'} border-l-4  rounded-lg p-4`}>
              <p className="text-gray-800 leading-relaxed">
                {contact?.adminMessage ? contact?.adminMessage : "There is no reply message"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
      </Modal>
    </>
  );
};

export default ViewContactModal;
