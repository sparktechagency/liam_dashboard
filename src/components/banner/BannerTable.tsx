import { Pagination, Table } from "antd";
import type { IMeta } from "../../types/global.type";
import { IBanner, IBannerDataSource } from "../../types/banner.type";
import placeholder from "../../assets/placeholder.png";
import DeleteBannerModal from "../modal/banner/DeleteBannerModal";
import EditBannerModal from "../modal/banner/EditBannerModal";



type TProps = {
  banners: IBanner[];
  meta: IMeta;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
}


const BannerTable = ({
  banners,
  meta,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
  loading,
}: TProps) => {

  const dataSource: IBannerDataSource[] = banners?.map((banner, index) => ({
    key: index,
    serial: Number(index + 1),
    _id: banner?._id,
    image: banner?.image,
    category: banner?.category?.name,
    categoryId: banner?.category?._id,
    subCategory: banner?.subCategory?.name,
    subCategoryId: banner?.subCategory?._id,
    type: banner?.type
  }))

  const columns = [
    {
      title: "S.N.",
      dataIndex: "serial",
      key: "serial",
      width: 60,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      width: 100,
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
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 180,
      render: (text: string) => (
        <>
          <p className="truncate">{text}</p>
        </>
      ),
    },
    {
      title: "Sub Category",
      dataIndex: "subCategory",
      key: "subCategory",
      width: 180,
      render: (text: string) => (
        <>
          <p className="truncate">{text}</p>
        </>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: 180,
      render: (text: string) => (
        <>
          <p className="truncate">{text}</p>
        </>
      ),
    },
     {
      title: "Action",
      dataIndex: "_id",
      key: "action",
      width: 115,
      render: (val: string, record: IBannerDataSource) => (
        <div className="flex items-center gap-3">
          <EditBannerModal banner={record} />
          <DeleteBannerModal bannerId={val} />
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

export default BannerTable;
