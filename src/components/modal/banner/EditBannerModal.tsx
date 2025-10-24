/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Modal, Select, Upload } from "antd";
import { useEffect, useState } from "react";
import { MdOutlineFileUpload, MdOutlineModeEdit } from "react-icons/md";
import placeholder_img from "../../../assets/placeholder.png";
import { useGetCategoryDropDownQuery } from "../../../redux/features/category/categoryApi";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import FormError from "../../validation/FormError";
import SubmitButton from "../../form/SubmitButton";
import { IBannerDataSource } from "../../../types/banner.type";
import { typeOptions } from "../../../data/option.data";
import { SetBannerUpdateError } from "../../../redux/features/banner/bannerSlice";
import { useGetSubCategoryDropDownByCategoryQuery } from "../../../redux/features/subCategory/subCategoryApi";
import { ISubCategory } from "../../../types/category.type";
import { useUpdateBannerMutation } from "../../../redux/features/banner/bannerApi";
const { Option } = Select;


type TProps = {
    banner: IBannerDataSource
}

const EditBannerModal = ({ banner }: TProps) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [imageSrc, setImageSrc] = useState(banner?.image || placeholder_img); // Default image
    const { BannerUpdateError } = useAppSelector((state) => state.banner);
    const [categoryId, setCategoryId] = useState(banner.categoryId);
    const [subCategoryOptions, setSubCategoryOptions] = useState([]);
    const { categoryOptions } = useAppSelector((state) => state.category)
    const [updateBanner, { isLoading, isSuccess }] = useUpdateBannerMutation();
    const dispatch = useAppDispatch();
    const { isLoading: categoryDropDownLoading } = useGetCategoryDropDownQuery([
        { name: "page", value: 1 },
        { name: "limit", value: 100 }
    ]);


    const { data: subCategoryData, isLoading: subCatgoryDropDownLoading } = useGetSubCategoryDropDownByCategoryQuery(categoryId, {
        skip: !categoryId
    });


    useEffect(() => {
        if (subCategoryData?.data) {
            setSubCategoryOptions(subCategoryData?.data?.map((cv: ISubCategory) => ({
                value: cv?._id,
                label: cv?.name
            })))
        }
    }, [subCategoryData, categoryId])



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
        } else {
            setImageSrc(banner?.image || placeholder_img)
        }
    };



    const onFinish = (values: any) => {
        dispatch(SetBannerUpdateError(""))
        const file = values.categoryImage?.[0]?.originFileObj;
        const formData = new FormData();
        formData.append("category", values.category)
        formData.append("subCategory", values.subCategory)
        formData.append("type", values.type)

        if (file) {
            formData.append("image", file);
        }
        updateBanner({
            id: banner?._id,
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
                        category: banner?.categoryId,
                        subCategory: banner?.subCategoryId,
                        type: banner?.type
                    });
                    setImageSrc(banner?.image || placeholder_img)
                }}
            >
                {BannerUpdateError && <FormError message={BannerUpdateError} />}
                <Form
                    form={form}
                    initialValues={{
                        category: banner?.category,
                        subCategory: banner?.subCategory,
                        type: banner?.type
                    }}
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
                            onChange={(val) => setCategoryId(val)}
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

                    <span className="text-md pb-2">Banner Image</span>
                    <div className="relative w-32 h-32 rounded-2xl overflow-hidden shadow-md mb-6 mt-1">
                        <img
                            src={imageSrc}
                            alt="Preview"
                            onError={() => setImageSrc(placeholder_img)} //fallback img
                            className="object-cover w-full h-full transition-opacity duration-200"
                        />
                    </div>
                    <Form.Item
                        name="bannerImage"
                        // label="Banner Image"
                        valuePropName="fileList"
                        getValueFromEvent={(e: any) => e?.fileList}
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
                        <SubmitButton isLoading={isLoading}>Save Changes</SubmitButton>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default EditBannerModal;