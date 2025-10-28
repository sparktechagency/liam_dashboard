import { Table } from "antd";
import type { IMeta } from "../../types/global.type";
import { IContractor, IContratorDataSource, TApprovalStatus } from "../../types/contractor.type";
import ChangeStatusModal from "../modal/auth/ChangeStatusModal";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import ContractorApprovalModal from "../modal/contractor/ContractorApprovalModal";
import { ColumnsType } from "antd/es/table";
import ChangeHomeContractorModal from "../modal/contractor/ChangeHomeContractorModal";


type TProps = {
  contractors: IContractor[];
  meta: IMeta;
  loading: boolean;
}


const RecentContractorTable = ({
  contractors,
  meta,
  loading,
}: TProps) => {

  const dataSource: IContratorDataSource[] = contractors?.map((contractor, index) => ({
    key: index,
    serial: Number(index + 1) + (meta.page - 1) * meta.limit,
    _id: contractor?._id,
    fullName: contractor?.fullName,
    email: contractor?.email,
    contactNo: contractor?.contactNo,
    status: contractor?.status,
    approvalStatus: contractor?.adminAccept,
    subscriptionStatus: contractor?.contractor?.subscriptionStatus,
     contractorId: contractor?.contractor?._id,
    isHomeSelect: contractor?.contractor?.isHomeSelect
  }))


  const columns: ColumnsType<IContratorDataSource>  = [
    {
      title: "S.N.",
      dataIndex: "serial",
      key: "serial",
      width: 60,
    },
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
      width: 180,
      render: (text: string) => (
        <>
          <p className="truncate">{text}</p>
        </>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 180,
      render: (text: string) => (
        <>
          <p className="truncate">{text}</p>
        </>
      ),
    },
    {
      title: "Approval Status",
      dataIndex: "approvalStatus",
      key: "approvalStatus",
      width: 160,
      render: (status: TApprovalStatus, record) => (
        <>
          <ContractorApprovalModal status={status} userId={record?._id}/>
        </>
      )
      ,
    },
     {
      title: "Subscription Status",
      dataIndex: "subscriptionStatus",
      key: "subscriptionStatus",
      width: 160,
      align: "center" as const,
      render: (text: string) => (
        <>
          <p className="truncate capitalize">{text}</p>
        </>
      ),
    },
    {
      title: "Block Status",
      dataIndex: "status",
      key: "status",
      width: 160,
      render: (status: string, record: IContratorDataSource) => (
        <ChangeStatusModal userId={record?._id} status={status} />
      )
      ,
    },
     {
      title: "Home Page",
      dataIndex: "isHomeSelect",
      key: "status",
      width: 145,
      render: (status: boolean, record: IContratorDataSource) => {
        const statusStyles = {
          hidden: "bg-gray-100 text-gray-600 border border-gray-300",
          visible: "bg-blue-100 text-blue-700 border border-blue-300",
        };

        const bgColor =
          status ? statusStyles.visible : statusStyles.hidden;

        return (
          <div className="flex items-center gap-2">
            <button
              className={`${bgColor} capitalize w-20 cursor-default px-3 py-0.5 text-sm font-medium rounded-full`}
            >
              {status ? "visible" : "hidden"}
            </button>
            <ChangeHomeContractorModal contractorId={record?.contractorId} status={status} />
          </div>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      width: 150,
      render: (userId: string, ) => (
        <div className="flex items-center gap-x-1">
          <Link
            to={`/contractor-details/${userId}`}
            className="bg-red-600 hover:bg-gray-700 p-1 text-white rounded-full"
          >
            <Eye size={18} />
          </Link>
        </div>
      ),
    },
  ];




  return (
    <>
      <div className="w-full overflow-auto overflow-x-auto">
        <Table
          size="small"
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          rowKey="_id"
          sticky
          scroll={{ y: "calc(100vh - 265px)" }}
          className="employer-table min-h-[calc(100vh-290px)]"
          loading={loading}
        />
      </div>
      </>
  );
};

export default RecentContractorTable;
