/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, Modal, Select, Upload } from "antd";
import { useEffect, useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { useGetCategoryDropDownQuery } from "../../../redux/features/category/categoryApi";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import SubmitButton from "../../form/SubmitButton";
import { useCreateSubCategoryMutation } from "../../../redux/features/subCategory/subCategoryApi";
import { SetSubCategoryCreateError } from "../../../redux/features/subCategory/subCategorySlice";
import FormError from "../../validation/FormError";
const { Option } = Select;


const AddSubCategoryModal = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const { SubCategoryCreateError } = useAppSelector((state) => state.subCategory);
    const [createSubCategory, { isLoading, isSuccess }] = useCreateSubCategoryMutation();
    const { categoryOptions } = useAppSelector((state) => state.category)
    useGetCategoryDropDownQuery([
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
        dispatch(SetSubCategoryCreateError(""))
        const file = values.categoryImage?.[0]?.originFileObj;

        if (file) {
            const formData = new FormData();
            formData.append("data", JSON.stringify({ name: values.name, categoryId: values.categoryId }));
            formData.append("file", file);
            createSubCategory(formData)
        }
    };

    return (
        <>
            <button onClick={showModal} className=" bg-primaryColor py-2 px-4 rounded-md cursor-pointer text-white">+ Add</button>
            <Modal maskClosable={false} centered footer={false} title="Add Sub Category" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                 {SubCategoryCreateError && <FormError message={SubCategoryCreateError} />}
                <Form
                    form={form}
                    initialValues={undefined}
                    onFinish={onFinish}
                    layout="vertical"
                    className="space-y-4"
                >
                    <Form.Item 
                      name="categoryId"
                      label="Category" 
                      rules={[{ required: true, message: "Please, Select a category !" }]}
                    >
                        <Select
                            placeholder="Select a category"
                            allowClear
                        >
                            {categoryOptions?.map(({ label, value }, index) => (
                                <Option key={index} value={value}>{label}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="name"
                        label="Sub Category Name"
                        rules={[{ required: true, message: "Please input the sub category name!" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="categoryImage"
                        label="Sub Category Image"
                        valuePropName="fileList"
                        getValueFromEvent={(e: any) => e?.fileList}
                        rules={[{ required: true, message: "Please upload the sub category image!" }]}
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
                   <SubmitButton isLoading={isLoading} loadingTitle="Adding...">Add</SubmitButton>
                </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default AddSubCategoryModal;