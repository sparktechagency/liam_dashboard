import { Pagination, Table } from "antd";
import type { IMeta } from "../../types/global.type";
import { ITransaction, ITransactionDataSource, TPaymentStatus } from "../../types/transaction.type";


type TProps = {
  transactions: ITransaction[];
  meta: IMeta;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
}


const TransactionTable = ({
  transactions,
  meta,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
  loading,
}: TProps) => {

  const dataSource: ITransactionDataSource[] = transactions?.map((transaction, index) => ({
    key: index,
    serial: transaction?.serial,
    name: transaction?.name,
    contractorType: transaction?.contractorType,
    dateOfPayment: transaction?.dateOfPayment,
    paymentType: transaction?.paymentType,
    paymentStatus: transaction?.paymentStatus,
    paidAmount: transaction?.paidAmount
  }))

  const columns = [
    {
      title: "Serial",
      dataIndex: "serial",
      key: "serial",
      width: 100,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 180,
      render: (text: string) => (
        <>
          <p className="truncate">{text}</p>
        </>
      ),
    },
    {
      title: "Contractor Type",
      dataIndex: "contractorType",
      key: "contractorType",
      width: 180,
      render: (text: string) => (
        <>
          <p className="truncate">{text}</p>
        </>
      ),
    },
    {
      title: "Date Of Payment",
      dataIndex: "dateOfPayment",
      key: "dateOfPayment",
      width: 180,
      render: (text: string) => (
        <>
          <p className="truncate">{text}</p>
        </>
      ),
    },
    {
      title: "Payment Type",
      dataIndex: "dateOfPayment",
      key: "dateOfPayment",
      width: 180,
      render: (text: string) => (
        <>
          <p className="truncate">{text}</p>
        </>
      ),
    },
      {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      width: 120,
      render: (paymentStatus: TPaymentStatus) => {
        const statusStyles = {
          Paid: "bg-green-100 text-green-700 border border-green-300",
          Failed: "bg-red-100 text-red-700 border border-red-300",
        };
        const style = statusStyles[paymentStatus] || "bg-gray-100 text-gray-700 border";
        return (
          <div className="flex items-center gap-2">
            <span
              className={`${style} w-20 capitalize text-center px-3 py-0.5 text-sm font-medium rounded-full`}
            >
              {paymentStatus}
            </span>
          </div>
        );
      }
    },
    {
      title: "Paid Amount",
      dataIndex: "paidAmount",
      key: "paidAmount",
      width: 180,
      render: (text: string) => (
        <>
          <p className="truncate">{text}</p>
        </>
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
          rowKey="serial"
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

export default TransactionTable;
