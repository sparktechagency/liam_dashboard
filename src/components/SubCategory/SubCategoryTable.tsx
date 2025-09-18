import { Pagination, Table } from "antd";
import type { ISubCategory, ISubCategoryDataSource } from "../../types/category.type";
import type { IMeta } from "../../types/global.type";
import placeholder from "../../assets/placeholder.png";
import EditSubCategoryModal from "../modal/SubCategory/EditSubCategoryModal";
import DeleteSubCategoryModal from "../modal/SubCategory/DeleteSubCategoryModal";


type TProps = {
  categories: ISubCategory[];
  meta: IMeta;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
}


const SubCategoryTable = ({
  categories, meta,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
  loading
}: TProps) => {

  const dataSource: ISubCategoryDataSource[] = categories?.map((category, index) => ({
    key: index,
    serial: Number(index + 1) + (meta.page - 1) * pageSize,
    _id: category?._id,
    name: category?.name,
    img: category?.img,
    category: category?.categoryId?.name,
    categoryId: category?.categoryId?._id
  }))

  const columns = [
    {
      title: "S.N.",
      dataIndex: "serial",
      key: "serial",
      width: 60,
    },
    {
      title: "Sub Category Name",
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
      title: "Image",
      dataIndex: "img",
      key: "img",
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
      title: "Action",
      dataIndex: "_id",
      key: "action",
      width: 115,
      render: (val: string, record: ISubCategoryDataSource) => (
        <div className="flex items-center gap-3">
          <EditSubCategoryModal subCategory={record} />
          <DeleteSubCategoryModal subCategoryId={val} />
        </div>
      ),
    },
  ];


  const handlePagination = (page: number, PageSize: number) => {
    setCurrentPage(page);
    setPageSize(PageSize);
  };

  return (
    <>
      <div className="w-full overflow-auto px-4 overflow-x-auto">
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
        <div className="p-8 bg-white border-t shadow-md flex justify-center">
          <Pagination
            onChange={handlePagination}
            current={currentPage}
            pageSize={pageSize}
            total={meta?.total}
          />
        </div>
      )}
      </>
  );
};

export default SubCategoryTable;
