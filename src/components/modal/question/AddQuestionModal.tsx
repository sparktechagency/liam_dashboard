/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal, Select } from "antd";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { useCreateQuestionMutation } from "../../../redux/features/question/questionApi";
import SubmitButton from "../../form/SubmitButton";
import FeatureForm from "../../subscription/FeatureForm";
import { useGetSubCategoryDropDownQuery } from "../../../redux/features/subCategory/subCategoryApi";
const { Option } = Select;



const AddQuestionModal = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const [question, setQuestion] = useState<string[]>([])
    const { QuestionCreateError } = useAppSelector((state) => state.question);
    const [createQuestion, { isLoading, isSuccess }] = useCreateQuestionMutation();
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
                        name="categoryId"
                        label="Category"
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
                    <FeatureForm features={question} setFeatures={setQuestion} title="Questions"/>
                    <SubmitButton isLoading={isLoading} loadingTitle="Adding...">Add Questions</SubmitButton>
                </Form>
            </Modal>
        </>
    );
};

export default AddQuestionModal;