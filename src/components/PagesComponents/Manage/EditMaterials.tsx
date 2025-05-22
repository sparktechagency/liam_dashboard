import React, { useEffect } from "react";
import { ConfigProvider, Form, Input, Modal, Select } from "antd";

const { Option } = Select;

type MaterialValues = {
  category: string;
  subCategory: string;
  materialsUnit: string;
  materialsPrice: string;
};

type EditMaterialsProps = {
  isModalOpen: boolean;
  handleOk: (values: MaterialValues) => void;
  handleCancel: () => void;
  initialValues?: MaterialValues;
};

const EditMaterials = ({
  isModalOpen,
  handleOk,
  handleCancel,
  initialValues = {
    category: "Category 1",
    subCategory: "Sub Category 1",
    materialsUnit: "Piece",
    materialsPrice: "12",
  },
}: EditMaterialsProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (isModalOpen) {
      form.setFieldsValue(initialValues);
    }
  }, [form, initialValues, isModalOpen]);

  const onFinish = (values: MaterialValues) => {
    handleOk(values);
  };

  return (
    <Modal
      centered
      footer={false}
      title="Edit Material"
      open={isModalOpen}
      onCancel={() => {
        form.resetFields();
        handleCancel();
      }}
      afterClose={() => form.resetFields()}
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
        <ConfigProvider
          theme={{
            components: {
              Select: {
                controlHeight: 40,
              },
            },
          }}
        >
          <div className="flex items-center gap-3">
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
              label="Sub Category"
              className="w-full"
              rules={[{ required: true, message: "Please select a sub category!" }]}
            >
              <Select placeholder="Select Sub Category" allowClear>
                <Option value="subCategory1">Sub Category 1</Option>
                <Option value="subCategory2">Sub Category 2</Option>
              </Select>
            </Form.Item>
          </div>
        </ConfigProvider>

        <div className="flex items-center gap-3">
          <Form.Item
            name="materialsUnit"
            label="Materials Unit"
            className="w-full"
            rules={[{ required: true, message: "Please enter the unit!" }]}
          >
            <Input placeholder="Enter Unit" />
          </Form.Item>

          <Form.Item
            name="materialsPrice"
            label="Materials Price"
            className="w-full"
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
            Save Changes
          </button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditMaterials;
