/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, Modal, Upload } from "antd";
import { useState } from "react";
import { MdOutlineFileUpload, MdOutlineModeEdit } from "react-icons/md";
import { ICategory } from "../../../types/category.type";

type TProps = {
  category: ICategory
}

const EditCategoryModal = ({ category }: TProps) => {
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

    const initialValues = {
        category: 'Electronics'
    }
    const onFinish = (values: any) => {
        console.log("Form Values: ", values);
    };

    return (
       <>
        <button onClick={showModal} className=" bg-primaryColor p-1 rounded cursor-pointer"><MdOutlineModeEdit className="w-6 h-6 text-white" /></button>
          <Modal  maskClosable={false} centered footer={false}  title="Edit Category" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Form
                form={form}
                initialValues={initialValues}
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
                    <button
                        type="submit"
                        className="rounded-lg font-semibold cursor-pointer bg-primaryColor text-white px-3 py-2"
                    >
                        Update Category
                    </button>
                </Form.Item>
            </Form>
        </Modal>
       </>
    );
};

export default EditCategoryModal;