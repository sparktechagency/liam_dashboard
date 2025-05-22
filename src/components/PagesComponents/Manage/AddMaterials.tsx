/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConfigProvider, Form, Input, Modal, Select } from "antd";

const { Option } = Select;

type AddMaterialsProps = {
    isModalOpen: boolean;
    handleOk: () => void;
    handleCancel: () => void;
};

const AddMaterials = ({ isModalOpen, handleOk, handleCancel }: AddMaterialsProps) => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log("Form Values: ", values);
    };

    return (
        <Modal centered footer={false} title="Add Material" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Form form={form} onFinish={onFinish} layout="vertical" initialValues={{}}>

                <ConfigProvider
                    theme={{
                        components: {
                            Select: {
                                "controlHeight": 40
                            },
                        },
                    }}
                >
                    <div className=" flex items-center gap-3">
                        <Form.Item
                            name="category"
                            label="Category"
                            className="w-full"
                            rules={[{ required: true, message: "Please select a category!" }]}
                        >
                            <Select placeholder="Select Category" allowClear>
                                <Option value="category1">Category 1</Option>
                                <Option value="category2">Category 2</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="subCategory"
                            className="w-full"
                            label="Sub Category"
                            rules={[{ required: true, message: "Please select a sub category!" }]}
                        >
                            <Select placeholder="Select Sub Category" allowClear>
                                <Option value="subCategory1">Sub Category 1</Option>
                                <Option value="subCategory2">Sub Category 2</Option>
                            </Select>
                        </Form.Item>
                    </div>
                </ConfigProvider>


                <div className=" flex items-center gap-3">
                    <Form.Item
                        name="materialsUnit"
                        className="w-full"
                        label="Materials Unit"
                        rules={[{ required: true, message: "Please enter the unit!" }]}
                    >
                        <Input placeholder="Enter Unit" />
                    </Form.Item>

                    <Form.Item
                        name="materialsPrice"
                        className="w-full"
                        label="Materials Price"
                        rules={[{ required: true, message: "Please enter the price!" }]}
                    >
                        <Input placeholder="Enter Price $" />
                    </Form.Item>

                </div>

                <Form.Item>
                    <button
                        type="submit"
                        className="rounded-lg font-semibold cursor-pointer bg-primaryColor text-white px-3 py-2"
                    >
                        Add Material
                    </button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddMaterials;
