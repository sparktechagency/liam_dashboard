/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
type FeedbackModalProps = {
    isModalOpen: boolean;
    handleOk: () => void;
    handleCancel: () => void;
};

const FeedbackModal = ({ isModalOpen, handleOk, handleCancel }: FeedbackModalProps) => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log("Form Values: ", values);
    };
    return (
        <div>
            <Modal centered footer={false} title="Message" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p className=" text-sm font-semibold mb-2">Report</p>
                <p className=" text-sm font-semibold mb-2">Feedback form: Jullu Jalal</p>
                <div className=" mb-2 border p-3 rounded border-[#dbdbdb]">
                    Lorem ipsum dolor sit amet consectetur. Eos error voluptatum illo nostrum cum. Adipisci nam itaque optio, eos velit culpa ipsam, odio nobis explicabo reprehenderit aliquid hic laborum asperiores ipsum accusantium? Sunt unde accusamus ducimus voluptatibus est sint, id hic ab harum officia, sit ipsam quisquam ex quos magnam, molestias vel nihil illo tempore eligendi architecto dicta non modi commodi. Animi culpa similique nam mollitia reiciendis quae cum officiis delectus, aut itaque asperiores?
                </div>
                <Form
                    form={form}
                    initialValues={undefined}
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Form.Item
                        name="reply"
                        label="Admin Reply"
                        rules={[{ required: true, message: "Please input the reply!" }]}
                    >
                        <TextArea />
                    </Form.Item>

                    <Form.Item>
                        <button
                            type="submit"
                            className="rounded-lg font-semibold cursor-pointer bg-primaryColor text-white px-6 py-2"
                        >
                            Send
                        </button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default FeedbackModal;