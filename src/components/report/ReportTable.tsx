import { Pagination, Table } from "antd";
import type { IMeta } from "../../types/global.type";
import ViewContactModal from "../modal/contact/ViewContactModal";
import { Reply } from "lucide-react";
import ReplyModal from "../modal/contact/ReplyModal";
import { IHelp, IHelpDataSource } from "../../types/help.type";
import placeholder from "../../assets/placeholder.png";



type TProps = {
  reports: IHelp[];
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

  const dataSource: IHelpDataSource[] = reports?.map((help, index) => ({
    key: index,
    serial: Number(index + 1) + (meta.page - 1) * meta.limit,
    _id: help?._id,
    fullName: help?.userId?.fullName,
    email: help?.userId?.email,
    img: help?.userId?.img,
    title: help?.title,
    details: help?.details,
    adminMessage: help?.adminMessage ? help?.adminMessage : ""
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
      width: 120,
      render: (text: string) => (
        <>
          <p className="truncate">{text}</p>
        </>
      ),
    },
    {
      title: "Image",
      dataIndex: "img",
      key: "img",
      width: 80,
      render: (val?: string) => (
        <div className="flex items-center">
          <img
            src={val || placeholder}
            alt="profile"
            className="w-[45px] h-[45px] rounded-lg"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = placeholder;
            }}
          />
        </div>
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
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 250,
      render: (text: string) => (
        <>
          <p className="truncate text-md">{text}</p>
        </>
      ),
    },
    {
      title: "Message",
      dataIndex: "details",
      key: "details",
      width: 250,
      render: (text: string) => (
        <>
          <p className="truncate text-md">{text}</p>
        </>
      ),
    },
    {
      title: "Action",
      key: "_id",
      dataIndex: "_id",
      width: "10%",
      align: "center" as const,
      render: (contactId: string, contact: IHelpDataSource) => (
        <div className="flex justify-center gap-2">
          <ViewContactModal contact={contact} />
          {contact?.adminMessage ? (
            <button className="bg-blue-300 hover:bg-blue-400 p-2 text-white rounded-full cursor-not-allowed">
              <Reply size={18} />
            </button>
          ) : (
            <ReplyModal contactId={contactId} />
          )}
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
