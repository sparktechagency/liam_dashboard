/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, Modal, Upload } from "antd";
import { useEffect, useState } from "react";
import { MdOutlineFileUpload, MdOutlineModeEdit } from "react-icons/md";
import { ICategory } from "../../../types/category.type";
import placeholder_img from "../../../assets/placeholder.png";
import { useUpdateCategoryMutation } from "../../../redux/features/category/categoryApi";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { SetCategoryUpdateError } from "../../../redux/features/category/categorySlice";
import FormError from "../../validation/FormError";
import SubmitButton from "../../form/SubmitButton";

type TProps = {
  category: ICategory
}

const EditCategoryModal = ({ category }: TProps) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [imageSrc, setImageSrc] = useState(category?.img || placeholder_img); // Default image
    const { CategoryUpdateError } = useAppSelector((state) => state.category);
    const [updateCategory, { isLoading, isSuccess }] = useUpdateCategoryMutation();
    const dispatch = useAppDispatch();

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

    //if success
    useEffect(() => {
        if (isSuccess) {
            handleCancel();
        }
    }, [isSuccess, form]);

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
        }else{
            setImageSrc(category?.img || placeholder_img)
        }
    };



    const onFinish = (values: any) => {
        dispatch(SetCategoryUpdateError(""))
        const file = values.categoryImage?.[0]?.originFileObj;
        const formData = new FormData();
        formData.append("data", JSON.stringify({ name: values.name }));
        if (file) {
            formData.append("file", file);
        }
        updateCategory({
            id: category?._id,
            data: formData
        })
    };

    return (
       <>
        <button onClick={showModal} className=" bg-primaryColor p-1 rounded cursor-pointer"><MdOutlineModeEdit className="w-6 h-6 text-white" /></button>
          <Modal 
             maskClosable={false} 
             centered footer={false}  
             title="Edit Category"
             open={isModalOpen} 
             onOk={handleOk}
                onCancel={() => {
                    handleCancel();
                    form.setFieldsValue({
                        name: category?.name
                    });
                    setImageSrc(category?.img || placeholder_img)
                }}
            >
            {CategoryUpdateError && <FormError message={CategoryUpdateError} />}
            <Form
                form={form}
                initialValues={{
                    name: category.name
                }}
                onFinish={onFinish}
                layout="vertical"
            >
                <Form.Item
                    name="name"
                    label="Category Name"
                    rules={[{ required: true, message: "Please input the category name!" }]}
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
                    // label="Category Image"
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
                        maxCount={1}
                    >
                        <Button icon={<MdOutlineFileUpload />}>Update Image</Button>
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

export default EditCategoryModal;