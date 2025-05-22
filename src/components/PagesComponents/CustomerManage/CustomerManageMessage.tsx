/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, Modal } from "antd";
type AddModalProps = {
    isModalOpen: boolean;
    handleOk: () => void;
    handleCancel: () => void;
};

const CustomerManageMessage = ({ isModalOpen, handleOk, handleCancel }: AddModalProps) => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log("Form Values: ", values);
    };
    return (
        <div>
            <Modal centered footer={false} title="Add Category" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus corporis consequatur fuga quos in architecto pariatur expedita veritatis, voluptates dolore ipsa ipsum rem exercitationem libero culpa illo cum impedit animi molestias doloribus error laborum. Eos error voluptatum illo nostrum cum. Adipisci nam itaque optio, eos velit culpa ipsam, odio nobis explicabo reprehenderit aliquid hic laborum asperiores ipsum accusantium? Sunt unde accusamus ducimus voluptatibus est sint, id hic ab harum officia, sit ipsam quisquam ex quos magnam, molestias vel nihil illo tempore eligendi architecto dicta non modi commodi. Animi culpa similique nam mollitia reiciendis quae cum officiis delectus, aut itaque asperiores?
                </div>
                <Form
                    form={form}
                    initialValues={undefined}
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Form.Item
                        name="reply"
                        label="Reply"
                        rules={[{ required: true, message: "Please input the reply!" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item>
                        <button
                            type="submit"
                            className="rounded-lg font-semibold cursor-pointer bg-primaryColor text-white px-3 py-2"
                        >
                            Send
                        </button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default CustomerManageMessage;