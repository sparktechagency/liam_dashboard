/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, InputNumber, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import SubmitButton from "../../form/SubmitButton";
import FeatureForm from "../../subscription/FeatureForm";
import { durationOptions, planOptions } from "../../../data/option.data";
import { WarningToast } from "../../../helper/ValidationHelper";
import { useCreateSubscriptionMutation } from "../../../redux/features/subscription/subscriptionApi";
import FormError from "../../validation/FormError";
import { useAppSelector } from "../../../redux/hooks/hooks";
const { Option } = Select;



const CreateSubscriptionModal = () => {
    const [features, setFeatures] = useState<string[]>([])
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { SubscriptionCreateError } = useAppSelector((state) => state.subscription);
    const [createSubscription, { isLoading, isSuccess }] = useCreateSubscriptionMutation();
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


    //if success
    useEffect(() => {
      if (!isLoading && isSuccess) {
        setIsModalOpen(false);
        form.resetFields()
      }
    }, [isLoading, isSuccess, form]);

    const onFinish = (values: any) => {
        if(features?.length===0){
            WarningToast("Please add minimum one feature !")
        }else{
            createSubscription({
                ...values,
                details: features
            })
        }
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
                {SubscriptionCreateError && <FormError message={SubscriptionCreateError} />}
                <Form
                    form={form}
                    initialValues={undefined}
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Form.Item
                        name="planType"
                        label="Plan Type"
                        rules={[{ required: true, message: "Please, Select a type !" }]}
                    >
                        <Select
                            placeholder="Select a type"
                            allowClear
                        >
                            {planOptions?.map(({ label, value }, index) => (
                                <Option key={index} value={value}>{label}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="duration"
                        label="Duration"
                        rules={[{ required: true, message: "Please, Select a duration !" }]}
                    >
                        <Select
                            placeholder="Select a type"
                            allowClear
                        >
                            {durationOptions?.map(({ label, value }, index) => (
                                <Option key={index} value={value}>{label}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="price"
                        label="Price"
                        rules={[
                            { required: true, message: "Please enter the price!" },
                            {
                                type: "number",
                                min: 1,
                                message: "Price must be greater than 0",
                            },
                        ]}
                    >
                        <InputNumber
                            style={{ width: "100%" }}
                            min={0} // prevents input below 1
                            placeholder="Enter price"
                        />
                    </Form.Item>
                    <FeatureForm features={features} setFeatures={setFeatures} />
                    <SubmitButton isLoading={isLoading}>Add New</SubmitButton>
                </Form>
            </Modal>
        </>
    );
};

export default CreateSubscriptionModal;