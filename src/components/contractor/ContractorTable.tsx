import { Pagination, Table } from "antd";
import type { IMeta } from "../../types/global.type";
import { IContractor, IContratorDataSource, TApprovalStatus } from "../../types/contractor.type";
import ChangeStatusModal from "../modal/auth/ChangeStatusModal";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import ContractorApprovalModal from "../modal/contractor/ContractorApprovalModal";
import { ColumnsType } from "antd/es/table";


type TProps = {
  contractors: IContractor[];
  meta: IMeta;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
}


const ContractorTable = ({
  contractors,
  meta,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
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
    subscriptionStatus: contractor?.contractor?.subscriptionStatus
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


  const handlePagination = (page: number, PageSize: number) => {
    setPageSize(pageSize)
    setCurrentPage(1);
    if (pageSize != PageSize) {
      setPageSize(PageSize);
    } else {
      setCurrentPage(page);
      setPageSize(PageSize);
    }
  };



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
      {meta?.total > 0 && (
        <div className="p-8 bg-white border-t border-gray-300 shadow-md flex justify-center">
          <Pagination
            onChange={handlePagination}
            current={currentPage}
            pageSize={meta.limit}
            total={meta?.total}
          />
        </div>
      )}
      </>
  );
};

export default ContractorTable;
