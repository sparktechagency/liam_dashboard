/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, Modal, Select, Upload } from "antd";
import { useEffect, useState } from "react";
import { MdOutlineFileUpload, MdOutlineModeEdit } from "react-icons/md";
import { ISubCategoryDataSource } from "../../../types/category.type";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { useUpdateSubCategoryMutation } from "../../../redux/features/subCategory/subCategoryApi";
import placeholder_img from "../../../assets/placeholder.png";
import FormError from "../../validation/FormError";
import { SetSubCategoryUpdateError } from "../../../redux/features/subCategory/subCategorySlice";
import SubmitButton from "../../form/SubmitButton";
import { useGetCategoryDropDownQuery } from "../../../redux/features/category/categoryApi";
const { Option } = Select;



type TProps = {
    subCategory: ISubCategoryDataSource
};

const EditSubCategoryModal = ({ subCategory }: TProps) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [imageSrc, setImageSrc] = useState(subCategory?.img || placeholder_img); // Default image
    const { SubCategoryUpdateError } = useAppSelector((state) => state.subCategory);
    const [updateSubCategory, { isLoading, isSuccess }] = useUpdateSubCategoryMutation();
    const { categoryOptions } = useAppSelector((state) => state.category)
    useGetCategoryDropDownQuery([
        { name: "page", value: 1 },
        { name: "limit", value: 100 }
    ]);
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<any[]>([]);

     //if success
    useEffect(() => {
        if (isSuccess) {
            handleCancel();
        }
    }, [isSuccess, form]);


    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
  

    const handleFileChange = (info: any) => {
        if (info.fileList.length > 1) {
            setFileList(info.fileList.slice(-1));
        } else {
            setFileList(info.fileList);
        }

        if (info.fileList[0]?.originFileObj) {
            const reader = new FileReader();
            reader.onload = () => setImageSrc(reader.result as string);
            reader.readAsDataURL(info.fileList[0]?.originFileObj);
        } else {
            setImageSrc(subCategory?.img || placeholder_img)
        }
    };

  
    const onFinish = (values: any) => {
        dispatch(SetSubCategoryUpdateError(""))
        const file = values.categoryImage?.[0]?.originFileObj;
        const formData = new FormData();

        formData.append("data", JSON.stringify({ name: values.name, categoryId: values.categoryId}));
        if (file) {
            formData.append("file", file);
        }
        updateSubCategory({
            id: subCategory?._id,
            data: formData
        })

    };
    

    return (
       <>
          <button onClick={showModal} className=" bg-primaryColor p-1 rounded cursor-pointer"><MdOutlineModeEdit className="w-6 h-6 text-white" /></button>
         <Modal 
           centered 
           maskClosable={false}
           footer={false}
           title="Edit Sub Category"
           open={isModalOpen}
           onOk={handleOk} 
           onCancel={() => {
              handleCancel();
              form.setFieldsValue({
                name: subCategory?.name,
                categoryId: subCategory?.categoryId
               });
               setImageSrc(subCategory?.img || placeholder_img)
            }}
          >
             {SubCategoryUpdateError && <FormError message={SubCategoryUpdateError} />}
            <Form
                form={form}
                initialValues={{
                    name: subCategory?.name,
                    categoryId: subCategory?.categoryId
                }}
                onFinish={onFinish}
                layout="vertical"
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
                <span className="text-md pb-2">Category Image</span>
                <div className="relative w-32 h-32 rounded-2xl overflow-hidden shadow-md mb-6 mt-1">
                 <img
                    src={imageSrc}
                    alt="Preview"
                    onError={() => setImageSrc(placeholder_img)} //fallback img
                    className="object-cover w-full h-full transition-opacity duration-200"
                 />
                </div>
                <Form.Item
                    name="categoryImage"
                    // label="Sub Category Image"
                    valuePropName="fileList"
                    getValueFromEvent={(e: any) => e?.fileList}
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
                   <SubmitButton isLoading={isLoading}>Save Changes</SubmitButton>
                </Form.Item>
            </Form>
        </Modal>
       </>
    );
};

export default EditSubCategoryModal;