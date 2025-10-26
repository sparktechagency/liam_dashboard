import { useState } from 'react'
import { Modal, Select } from 'antd';
import ApprovalButton from '../../contractor/ApprovalButton';
import { TApprovalStatus } from '../../../types/contractor.type';
const { Option } = Select;


type TProps = {
    status: TApprovalStatus;
    userId: string;
}


const ContractorApprovalModal = ({ status, userId} : TProps) => {
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedStatus, setSelectedStatus] = useState<TApprovalStatus>(status)
   
    console.log(userId)

    return (
        <>
            <ApprovalButton status={status} size="sm" />

            <Modal
                title="Change Approval Status"
                open={modalOpen}
                // onOk={handleOk}
                onCancel={() => setModalOpen(false)}
                okText="Confirm"
                cancelText="Cancel"
            >
                <div className="flex flex-col gap-2">
                    <label className="font-medium">Select New Status:</label>
                    <Select
                        value={selectedStatus}
                        onChange={(value: TApprovalStatus) => setSelectedStatus(value)}
                        className="w-full"
                    >
                        <Option value="pending">Pending</Option>
                        <Option value="approved">Approved</Option>
                        <Option value="rejected">Rejected</Option>
                    </Select>
                </div>
            </Modal>
        </>
    )
}

export default ContractorApprovalModal;