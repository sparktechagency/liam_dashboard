/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal, Input } from "antd";
import { useState, useEffect } from "react";
import { Reply } from "lucide-react";
import SubmitButton from "../../form/SubmitButton";
import { useReplyContactMutation } from "../../../redux/features/report/reportApi";

const { TextArea } = Input;

type TProps = {
  contactId: string;
};

const ReplyModal = ({ contactId }: TProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [reply, { isLoading, isSuccess }] = useReplyContactMutation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (!isLoading && isSuccess) {
      form.resetFields();
      setModalOpen(false);
    }
  }, [isLoading, isSuccess, form]);

  const onFinish = (values: any) => {
    reply({ helpId: contactId, adminMessage: values.adminMessage });
  };

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="bg-blue-600 cursor-pointer hover:bg-blue-700 p-2 text-white rounded-full"
      >
        <Reply size={18} />
      </button>

      <Modal
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          form.resetFields();
        }}
        maskClosable={false}
        footer={false}
      >
        <div className="w-full mx-auto">
          <div className="bg-white rounded-xl overflow-hidden transition-all duration-300">
            <div className="p-2">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Reply Message
              </h2>

              <Form
                form={form}
                onFinish={onFinish}
                layout="vertical"
              >
                <Form.Item
                  name="adminMessage"
                  label="Reply Message"
                  rules={[
                    { required: true, message: "Please enter your reply message!" },
                  ]}
                >
                  <TextArea
                    placeholder="Type your reply..."
                    rows={4}
                    maxLength={500}
                  />
                </Form.Item>

                <SubmitButton isLoading={isLoading} loadingTitle="Sending...">
                  Send Reply
                </SubmitButton>
              </Form>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ReplyModal;
