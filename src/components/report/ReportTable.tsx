/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pagination, Table } from "antd";
import type { IMeta } from "../../types/global.type";
import { IContractor, IContratorDataSource } from "../../types/contractor.type";
import ChangeStatusModal from "../modal/auth/ChangeStatusModal";


type TProps = {
  reports: IContractor[];
  meta: IMeta;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
}


const ReportTable = ({
  reports,
  meta,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
  loading,
}: TProps) => {

  const dataSource: IContratorDataSource[] = reports?.map((contractor, index) => ({
    key: index,
    serial: Number(index + 1) + (meta.page - 1) * meta.limit,
    _id: contractor?._id,
    fullName: contractor?.fullName,
    email: contractor?.email,
    contactNo: contractor?.contactNo,
    status: contractor?.status
  }))

  const columns = [
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
      title: "Contact Number",
      dataIndex: "contactNo",
      key: "contactNo",
      width: 180,
      render: (text: string) => (
        <>
          <p className="truncate">{text}</p>
        </>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 160,
      render: (status: string) => {
        const statusStyles = {
          blocked: "bg-red-100 text-red-700 border border-red-300",
          active: "bg-green-100 text-green-700 border border-green-300",
        };
        const bgColor = status === "blocked" ? statusStyles.blocked : statusStyles.active;
        return (
            <button
              className={`${bgColor} w-20 cursor-default px-3 py-0.5 text-sm font-medium rounded-full`}
            >
              {status === "blocked" ? "Blocked" : "Active"}
            </button>
        );
      },
    },
    {
      title: "Action",
      width: 150,
      render: (_: any, record: IContratorDataSource) => (
        <div className="flex items-center">
         <ChangeStatusModal userId={record?._id} status={record?.status}/>
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

export default ReportTable;
