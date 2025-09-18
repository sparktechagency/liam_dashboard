/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, Modal, Upload } from "antd";
import { useEffect, useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import SubmitButton from "../../form/SubmitButton";
import { useAppSelector } from "../../../redux/hooks/hooks";
import { useCreateCategoryMutation } from "../../../redux/features/category/categoryApi";
import Error from "../../validation/Error";


const AddCategoryModal = () => {
    const { CategoryCreateError } = useAppSelector((state) => state.category);
    const [createCategory, { isLoading, isSuccess }] = useCreateCategoryMutation();
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
    const [fileList, setFileList] = useState<any[]>([]);

    const handleFileChange = (info: any) => {
        if (info.fileList.length > 1) {
            setFileList(info.fileList.slice(-1));
        } else {
            setFileList(info.fileList);
        }
    };

    //if success
    useEffect(() => {
        if (!isLoading && isSuccess) {
            setIsModalOpen(false);
            form.resetFields()
        }
    }, [isLoading, isSuccess, form]);


    const onFinish = (values: any) => {
        const file = values.categoryImage?.[0]?.originFileObj;

        if (file) {
            const formData = new FormData();
            formData.append("data", JSON.stringify({ name: values.category}));
            formData.append("file", file);
            createCategory(formData)
        }
    };

    return (
      <>
       <button onClick={showModal} className=" bg-primaryColor py-2 px-4 rounded-md cursor-pointer text-white">+ Add</button>
          <Modal maskClosable={false} centered footer={false} title="Add Category" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
             {CategoryCreateError && <Error message={CategoryCreateError} />}
            <Form
                form={form}
                initialValues={undefined}
                onFinish={onFinish}
                layout="vertical"
            >
                <Form.Item
                    name="category"
                    label="Category Name"
                    rules={[{ required: true, message: "Please input the category name!" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="categoryImage"
                    label="Category Image"
                    valuePropName="fileList"
                    getValueFromEvent={(e: any) => e?.fileList}
                    rules={[{ required: true, message: "Please upload the category image!" }]}
                >
                    <Upload
                        name="categoryImage"
                        listType="picture"
                        fileList={fileList}
                        onChange={handleFileChange}
                        beforeUpload={() => false} // Prevent auto upload
                        accept="image/*"
                    >
                        <Button icon={<MdOutlineFileUpload />}>Upload Image</Button>
                    </Upload>
                </Form.Item>

                <Form.Item>
                   <SubmitButton isLoading={isLoading} loadingTitle="Adding...">Add Category</SubmitButton>
                </Form.Item>
            </Form>
        </Modal>
      </>
    );
};

export default AddCategoryModal;