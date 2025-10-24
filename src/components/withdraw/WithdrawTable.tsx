/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pagination, Table } from "antd";
import type { IMeta } from "../../types/global.type";
import { IWithdraw } from "../../types/withdraw.type";


type TProps = {
  withdraws: IWithdraw[];
  meta: IMeta;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
}


const WithdrawTable = ({
  withdraws,
  meta,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
  loading,
}: TProps) => {

  const dataSource: any[] = withdraws?.map((withdraw, index) => ({
    key: index,
    serial: Number(index + 1) + (meta.page - 1) * meta.limit,
    _id: withdraw?._id,
    transactionId: withdraw?.payoutId,
    fullName: withdraw?.userId?.fullName,
    email: withdraw?.userId?.email,
    img: withdraw?.userId?.img,
    amount: withdraw?.amount,
    status: withdraw?.status
  }))

  console.log(dataSource)

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
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
      width: 180,
      render: (text: string) => (
        <>
          <p className="truncate">{text}</p>
        </>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      width: 90,
      align: "center" as const
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 160,
      render: (status: string) => {
        const statusStyles = {
          rejected: "bg-red-100 text-red-700 border border-red-300",
          received : "bg-green-100 text-green-700 border border-green-300",
        };
        const bgColor = status === "rejected" ? statusStyles.rejected : statusStyles.received;
        return (
            <button
              className={`${bgColor} capitalize w-24 cursor-default px-3 py-0.5 text-sm font-medium rounded-full`}
            >
              {status} 
            </button>
        );
      },
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

export default WithdrawTable;
