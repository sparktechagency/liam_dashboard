/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, Modal } from "antd";
import { useState } from "react";
import SubmitButton from "../../form/SubmitButton";


const CreateSubscriptionModal = () => {
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
    };

    return (
        <>
            <button
                onClick={showModal}
                className="rounded-lg font-semibold cursor-pointer bg-primaryColor text-white px-3 py-2"
            >
                Add Subscription
            </button>
         <Modal maskClosable={false} centered footer={false} title="Add Subscription" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
                    <SubmitButton isLoading={isLoading} loadingTitle="Adding...">Add</SubmitButton>
                </Form.Item>
            </Form>
        </Modal>
        </>
    );
};

export default CreateSubscriptionModal;