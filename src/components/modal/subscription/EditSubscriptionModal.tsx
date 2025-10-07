/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, Modal } from "antd";
import { useState } from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import { ISubscription } from "../../../types/subscription";
import SubmitButton from "../../form/SubmitButton";

type TProps = {
    subscription: ISubscription
}

const EditSubscriptionModal = ({ subscription}: TProps) => {
    const isLoading = false;
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
        console.log(subscription)
    };

    return (
        <>
            <button onClick={showModal} className=" bg-primaryColor p-1 rounded cursor-pointer"><MdOutlineModeEdit className="w-6 h-6 text-white" /></button>
            <Modal maskClosable={false} centered footer={false} title="Update Subscription" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    form={form}
                    initialValues={undefined}
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Form.Item
                        name="subscriptionPlan"
                        label="Subscription Plan"
                        rules={[{ required: true, message: "Please input the subscription plan!" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="price"
                        label="Price"
                        rules={[{ required: true, message: "Please input the price!" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="duration"
                        label="Duration"
                        rules={[{ required: true, message: "Please input the duration!" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="contractorFeePerMonth"
                        label="Contractor Fee Per Month"
                        rules={[{ required: true, message: "Please input the contractor fee per month!" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item>
                        <SubmitButton isLoading={isLoading}>Save Changes</SubmitButton>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default EditSubscriptionModal;