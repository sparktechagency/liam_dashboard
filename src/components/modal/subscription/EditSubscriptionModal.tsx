/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, InputNumber, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import { ISubscription } from "../../../types/subscription";
import SubmitButton from "../../form/SubmitButton";
import FeatureForm from "../../subscription/FeatureForm";
import { useUpdateSubscriptionMutation } from "../../../redux/features/subscription/subscriptionApi";
import { WarningToast } from "../../../helper/ValidationHelper";
import { durationOptions, planOptions } from "../../../data/option.data";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import FormError from "../../validation/FormError";
import checkEqualArray from "../../../utils/checkEqualArray";
import { SetSubscriptionUpdateError } from "../../../redux/features/subscription/subscriptionSlice";
const { Option } = Select;


type TProps = {
    subscription: ISubscription
}

const EditSubscriptionModal = ({ subscription}: TProps) => {
    const dispatch = useAppDispatch();
    const [features, setFeatures] = useState<string[]>(subscription.details)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { SubscriptionUpdateError } = useAppSelector((state) => state.subscription);
    const [updateSubscription, { isLoading, isSuccess }] = useUpdateSubscriptionMutation();
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
            handleCancel();
        }
    }, [isLoading, isSuccess, form]);


    const onFinish = (values: any) => {
        dispatch(SetSubscriptionUpdateError(""))
        if (features?.length === 0) {
            WarningToast("Please add minimum one feature !");
            return;
        }

        const finalValues: Record<string, unknown> = {};
        if (subscription.planType != values.planType) {
            finalValues.planType = values.planType
        }
        if (subscription.duration != values.duration) {
            finalValues.duration = values.duration
        }
        if (subscription.price != values.price) {
            finalValues.price = values.price
        }

        if (!checkEqualArray(subscription.details, features)) {
            finalValues.details = features;
        }

        if (Object.keys(finalValues).length === 0) {
            WarningToast("No changes detected. Please update at least one field before saving.");
            return
        }

        updateSubscription({
            id: subscription._id,
            data: finalValues
        })
    };

    return (
        <>
            <button 
              onClick={showModal}
              className=" bg-primaryColor p-1 rounded cursor-pointer"
            >
                <MdOutlineModeEdit className="w-6 h-6 text-white" />
            </button>
            <Modal
                maskClosable={false}
                centered footer={false}
                title="Update Subscription"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={() => {
                    handleCancel();
                    form.setFieldsValue({
                        planType: subscription?.planType,
                        duration: subscription?.duration,
                        price: subscription?.price
                    });
                    setFeatures(subscription.details)
                }}
            >
                {SubscriptionUpdateError && <FormError message={SubscriptionUpdateError} />}
                <Form
                    form={form}
                    initialValues={{
                        planType: subscription?.planType,
                        duration: subscription?.duration,
                        price: subscription?.price
                    }}
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
                    <SubmitButton isLoading={isLoading}>Save Changes</SubmitButton>
                </Form>
            </Modal>
        </>
    );
};

export default EditSubscriptionModal;