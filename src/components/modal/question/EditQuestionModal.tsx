/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import SubmitButton from "../../form/SubmitButton";
import FeatureForm from "../../subscription/FeatureForm";
import { WarningToast } from "../../../helper/ValidationHelper";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import FormError from "../../validation/FormError";
import checkEqualArray from "../../../utils/checkEqualArray";
import { SetSubscriptionUpdateError } from "../../../redux/features/subscription/subscriptionSlice";
import { IQuestionDataSource } from "../../../types/question.type";
import { useGetSubCategoryDropDownQuery } from "../../../redux/features/subCategory/subCategoryApi";
import { useUpdateQuestionMutation } from "../../../redux/features/question/questionApi";
const { Option } = Select;


type TProps = {
    question: IQuestionDataSource
}

const EditQuestionModal = ({ question: initialQuestion }: TProps) => {
    const dispatch = useAppDispatch();
    const [question, setQuestion] = useState<string[]>(initialQuestion.question)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { QuestionUpdateError } = useAppSelector((state) => state.question);
    const [updateQuestion, { isLoading, isSuccess }] = useUpdateQuestionMutation();
    const { subCategoryOptions } = useAppSelector((state) => state.subCategory)
    useGetSubCategoryDropDownQuery([
        { name: "page", value: 1 },
        { name: "limit", value: 100 }
    ]);

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
        if (question?.length === 0) {
            WarningToast("Please add minimum one feature !");
            return;
        }

        const finalValues: Record<string, unknown> = {};
        if (initialQuestion.subCategoryId != values.subCategoryId) {
            finalValues.subCategoryId = values.subCategoryId
        }

        if (!checkEqualArray(initialQuestion.question, question)) {
            finalValues.question = question;
        }

        if (Object.keys(finalValues).length === 0) {
            WarningToast("No changes detected. Please update at least one field before saving.");
            return
        }
        updateQuestion({
            id: initialQuestion._id,
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
                title="Update Question"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={() => {
                    handleCancel();
                    form.setFieldsValue({
                        subCategoryId: initialQuestion?.subCategoryId
                    });
                    setQuestion(initialQuestion.question);
                }}
            >
                {QuestionUpdateError && <FormError message={QuestionUpdateError} />}
                <Form
                    form={form}
                    initialValues={{
                        subCategoryId: initialQuestion?.subCategoryId
                    }}
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Form.Item
                        name="subCategoryId"
                        label="Sub Category"
                        rules={[{ required: true, message: "Please, Select a sub category !" }]}
                    >
                        <Select
                            placeholder="Select a sub category"
                            allowClear
                        >
                            {subCategoryOptions?.map(({ label, value }, index) => (
                                <Option key={index} value={value}>{label}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <FeatureForm features={question} setFeatures={setQuestion} title="Questions" />
                    <SubmitButton isLoading={isLoading}>Save Changes</SubmitButton>
                </Form>
            </Modal>
        </>
    );
};

export default EditQuestionModal;