/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";

type AddQuestionProps = {
    isModalOpen: boolean;
    handleOk: () => void;
    handleCancel: () => void;
};

const AddQuestion = ({ isModalOpen, handleOk, handleCancel }: AddQuestionProps) => {

    const [form] = Form.useForm();


    const onFinish = (values: any) => {
        console.log("Form Values: ", values);
    };

    return (
        <Modal centered footer={false} title="Add Questions" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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

    );
};

export default AddQuestion;