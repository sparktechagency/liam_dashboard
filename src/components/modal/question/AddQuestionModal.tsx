/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";


const AddQuestionModal = () => {
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
    const [form] = Form.useForm();


    const onFinish = (values: any) => {
        console.log("Form Values: ", values);
    };

    return (
        <>
            <button onClick={showModal} className=" bg-primaryColor py-2 px-4 rounded-md cursor-pointer text-white">+ Add</button>
            <Modal maskClosable={false} centered footer={false} title="Add Questions" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    form={form}
                    initialValues={undefined}
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Form.Item
                        name="questions"
                        label="Questions Name"
                        rules={[{ required: true, message: "Please input the questions name!" }]}
                    >
                        <TextArea />
                    </Form.Item>

                    <Form.Item>
                        <button
                            type="submit"
                            className="rounded-lg font-semibold cursor-pointer bg-primaryColor text-white px-3 py-2"
                        >
                            Add Questions
                        </button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default AddQuestionModal;