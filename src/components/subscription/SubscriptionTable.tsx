import { Table } from "antd";
import { ISubscription, ISubscriptionDataSource } from "../../types/subscription";


type TProps = {
  subscriptions: ISubscription[];
  loading: boolean;
}


const SubscriptionTable = ({
  subscriptions, 
  loading,
}: TProps) => {

  const dataSource: ISubscriptionDataSource[] = subscriptions?.map((subscription, index) => ({
    key: index,
    slNo: subscription?.slNo,
    subscriptionPlan: subscription?.subscriptionPlan,
    price: subscription?.price,
    duration: subscription?.duration,
    contractorFeePerMonth: subscription?.contractorFeePerMonth
  }))

  const columns = [
    {
      title: "S.N.",
      dataIndex: "slNo",
      key: "slNo",
      width: 60,
    },
    {
      title: "Subscription Plan",
      dataIndex: "subscriptionPlan",
      key: "subscriptionPlan",
      width: 180,
      render: (text: string) => (
        <>
          <p className="truncate">{text}</p>
        </>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "email",
      width: 180,
      render: (text: string) => (
        <>
          <p className="truncate">{text}</p>
        </>
      ),
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      width: 180,
      render: (text: string) => (
        <>
          <p className="truncate">{text}</p>
        </>
      ),
    },
    {
      title: "Contractor Fee Per Month",
      dataIndex: "contractorFeePerMonth",
      key: "contractorFeePerMonth",
      width: 180,
      align: "center" as const,
      render: (text: string) => (
        <>
          <p className="truncate">{text}</p>
        </>
      ),
    },
    // {
    //   title: "Action",
    //   width: 150,
    //   render: (_: any, record: IContratorDataSource) => (
    //     <div className="flex items-center">
    //      <ChangeStatusModal userId={record?._id} status={record?.status}/>
    //     </div>
    //   ),
    // },
  ];




  return (
    <>
      <div className="w-full overflow-auto overflow-x-auto">
        <Table
          size="small"
          columns={columns}
          dataSource={dataSource}
          rowKey="slNo"
          sticky
          scroll={{ y: "calc(100vh - 265px)" }}
          className="employer-table min-h-[calc(100vh-290px)]"
          loading={loading}
          pagination={false}
        />
      </div>
      </>
  );
};

export default SubscriptionTable;
