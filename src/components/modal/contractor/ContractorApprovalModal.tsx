import { useEffect, useState } from 'react'
import { Form, Modal, Select } from 'antd';
import ApprovalButton from '../../contractor/ApprovalButton';
import { TApprovalStatus } from '../../../types/contractor.type';
import SubmitButton from '../../form/SubmitButton';
import { approvalOptions } from '../../../data/option.data';
import { useApproveContractorMutation } from '../../../redux/features/contractor/contractorApi';
const { Option } = Select;


type TProps = {
    status: TApprovalStatus;
    userId: string;
}


const ContractorApprovalModal = ({ status, userId} : TProps) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [form] = Form.useForm();
   
    const [approveContractor, { isLoading, isSuccess }] =
        useApproveContractorMutation();

    useEffect(() => {
        if (!isLoading && isSuccess) {
            setModalOpen(false);
        }
    }, [isLoading, isSuccess]);

    const onFinish = ( values: {status: TApprovalStatus}) => {
        approveContractor({
            userId,
            status: values.status
        })
    }

    return (
        <>
            <ApprovalButton status={status} onClick={()=> setModalOpen(true)} size="md" />

            <Modal
                title="Change Approval Status"
                open={modalOpen}
                // onOk={handleOk}
                onCancel={() => {
                    setModalOpen(false)
                    form.setFieldsValue({
                        status
                    });
                }}
                okText="Confirm"
                cancelText="Cancel"
                maskClosable={false} centered footer={false} 
            >
                <Form
                    form={form}
                    initialValues={{
                        status
                    }}
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Form.Item
                        name="status"
                        label="Status"
                        rules={[{ required: true, message: "Please, Select a status !" }]}
                    >
                        <Select
                            placeholder="Select a type"
                        >
                            {approvalOptions?.map(({ label, value }, index) => (
                                <Option key={index} value={value}>{label}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <SubmitButton isLoading={isLoading}>Save Change</SubmitButton>
                </Form>
            </Modal>
        </>
    )
}

export default ContractorApprovalModal;