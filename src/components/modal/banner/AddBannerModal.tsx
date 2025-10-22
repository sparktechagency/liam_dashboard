/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Modal, Select, Upload } from "antd";
import { useEffect, useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { useGetCategoryDropDownQuery } from "../../../redux/features/category/categoryApi";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import SubmitButton from "../../form/SubmitButton";
import { useGetSubCategoryDropDownQuery } from "../../../redux/features/subCategory/subCategoryApi";
import FormError from "../../validation/FormError";
import { ISubCategory } from "../../../types/category.type";
import { useCreateBannerMutation } from "../../../redux/features/banner/bannerApi";
import { typeOptions } from "../../../data/option.data";
import { SetBannerCreateError } from "../../../redux/features/banner/bannerSlice";
const { Option } = Select;


const AddBannerModal = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const { BannerCreateError } = useAppSelector((state) => state.banner);
    const [createBanner, { isLoading, isSuccess }] = useCreateBannerMutation();
    const [categoryId, setCategoryId] = useState("");
    const [subCategoryOptions, setSubCategoryOptions] = useState([]);
    const { categoryOptions } = useAppSelector((state) => state.category)
    const { isLoading: categoryDropDownLoading} =useGetCategoryDropDownQuery([
        { name: "page", value: 1 },
        { name: "limit", value: 100 }
    ]);

    const {data: subCategoryData, isLoading: subCatgoryDropDownLoading} = useGetSubCategoryDropDownQuery(categoryId, {
        skip: !categoryId
    });

    useEffect(() => {
        if (subCategoryData?.data) {
            setSubCategoryOptions(subCategoryData?.data?.map((cv: ISubCategory) => ({
                value: cv?._id,
                label: cv?.name
            })))
        }
    }, [subCategoryData])





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
        dispatch(SetBannerCreateError(""))
        const file = values.bannerImage?.[0]?.originFileObj;

        if (file) {
            const formData = new FormData();
            formData.append("data", JSON.stringify({ category: values.category, subCategory: values.subCategory, type:values.type }));
            formData.append("image", file);
            createBanner(formData)
        }
    };

    return (
        <>
            <button onClick={showModal} className=" bg-primaryColor py-2 px-4 rounded-md cursor-pointer text-white">+ Add</button>
            <Modal maskClosable={false} centered footer={false} title="Add Sub Category" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                 {BannerCreateError && <FormError message={BannerCreateError} />}
                <Form
                    form={form}
                    initialValues={undefined}
                    onFinish={onFinish}
                    layout="vertical"
                    className="space-y-4"
                >
                    <Form.Item 
                      name="category"
                      label="Category" 
                      rules={[{ required: true, message: "Please, Select a category !" }]}
                    >
                        <Select
                            placeholder="Select a category"
                            allowClear
                            onChange={(val)=> setCategoryId(val)}
                            disabled={categoryDropDownLoading}
                        >
                            {categoryOptions?.map(({ label, value }, index) => (
                                <Option key={index} value={value}>{label}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item 
                      name="subCategory"
                      label="Sub Category" 
                      rules={[{ required: true, message: "Please, Select a sub category !" }]}
                    >
                        <Select
                            placeholder="Select a Sub Category"
                            allowClear
                            disabled={subCatgoryDropDownLoading || subCategoryOptions?.length===0}
                        >
                            {subCategoryOptions?.map(({ label, value }, index) => (
                                <Option key={index} value={value}>{label}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item 
                      name="type"
                      label="Type" 
                      rules={[{ required: true, message: "Please, Select a type !" }]}
                    >
                        <Select
                            placeholder="Select a type"
                            allowClear
                        >
                            {typeOptions?.map(({ label, value }, index) => (
                                <Option key={index} value={value}>{label}</Option>
                            ))}
                        </Select>
                    </Form.Item>
              
                    <Form.Item
                        name="bannerImage"
                        label="Banner Image"
                        valuePropName="fileList"
                        getValueFromEvent={(e: any) => e?.fileList}
                        rules={[{ required: true, message: "Please upload the banner image!" }]}
                    >
                        <Upload
                            name="bannerImage"
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

export default AddBannerModal;