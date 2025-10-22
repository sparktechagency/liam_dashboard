/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { useCreateQuestionMutation } from "../../../redux/features/question/questionApi";
import SubmitButton from "../../form/SubmitButton";
import FeatureForm from "../../subscription/FeatureForm";


const AddQuestionModal = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const [features, setFeatures] = useState<string[]>([])
    const { QuestionCreateError } = useAppSelector((state) => state.question);
    const [createQuestion, { isLoading, isSuccess }] = useCreateQuestionMutation();

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
                    <FeatureForm features={features} setFeatures={setFeatures}/>
                   <SubmitButton isLoading={isLoading} loadingTitle="Adding...">Add Questions</SubmitButton>
                </Form>
            </Modal>
        </>
    );
};

export default AddQuestionModal;