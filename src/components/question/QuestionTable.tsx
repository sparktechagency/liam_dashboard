import { Pagination, Table } from "antd";
import type { IMeta } from "../../types/global.type";
import placeholder from "../../assets/placeholder.png";
import DeleteCategoryModal from "../modal/category/DeleteCategoryModal";
import { IQuestion, IQuestionDataSource } from "../../types/question.type";


type TProps = {
  questions: IQuestion[];
  meta: IMeta;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
}


const QuestionTable = ({
  questions,
  meta,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
  loading
}: TProps) => {

  const dataSource: IQuestionDataSource[] = questions?.map((question, index) => ({
    key: index,
    serial: Number(index + 1) + (meta.page - 1) * pageSize,
    _id: question?._id,
    question: question?.question,
    subCategory: question?.subCategoryId?.name,
    subCategoryId: question?.subCategoryId?._id,
    img: question?.subCategoryId?.img
  }))

  const columns = [
    {
      title: "S.N.",
      dataIndex: "serial",
      key: "serial",
      width: 60,
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
      title: "Questions",
      dataIndex: "question",
      key: "question",
      width: 300,
      render: (questions: string[]) => (
        <>
          {questions?.map((question, i) => (
            <p key={i} className="truncate">{Number(i + 1)}. {question}</p>
          ))}
        </>
      ),
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "action",
      width: 115,
      render: (val: string) => (
        <div className="flex items-center gap-3">
          {/* <EditCategoryModal category={record} /> */}
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
