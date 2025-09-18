import { Pagination, Table } from "antd";
import type { ICategory, ICategoryDataSource } from "../../types/category.type";
import type { IMeta } from "../../types/global.type";
import placeholder from "../../assets/placeholder.png";
import EditCategoryModal from "../modal/category/EditCategoryModal";
import DeleteCategoryModal from "../modal/category/DeleteCategoryModal";


type TProps = {
  categories: ICategory[];
  meta: IMeta;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
}


const QuestionTable = ({
  categories, meta,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
  loading
}: TProps) => {

  const dataSource: ICategoryDataSource[] = categories?.map((category, index) => ({
    key: index,
    serial: Number(index + 1) + (meta.page - 1) * pageSize,
    _id: category?._id,
    name: category?.name,
    img: category?.img
  }))

  const columns = [
    {
      title: "S.N.",
      dataIndex: "serial",
      key: "serial",
      width: 60,
    },
    {
      title: "Category Name",
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
      render: (val: string, record: ICategory) => (
        <div className="flex items-center gap-3">
          <EditCategoryModal category={record} />
          <DeleteCategoryModal categoryId={val} />
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

export default QuestionTable;
