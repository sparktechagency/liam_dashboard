/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";

type EditQuestionProps = {
    isModalOpen: boolean;
    handleOk: () => void;
    handleCancel: () => void;
};

const EditQuestion = ({ isModalOpen, handleOk, handleCancel }: EditQuestionProps) => {

    const [form] = Form.useForm();


    const onFinish = (values: any) => {
        console.log("Form Values: ", values);
    };

    return (
        <Modal centered footer={false} title="Edit Questions" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
                        Edit Questions
                    </button>
                </Form.Item>
            </Form>
        </Modal>

    );
};

export default EditQuestion;