import { Table } from "antd";
import { ISubscription, ISubscriptionDataSource } from "../../types/subscription";
import EditSubscriptionModal from "../modal/subscription/EditSubscriptionModal";
import DeleteSubscriptionModal from "../modal/subscription/DeleteSubscriptionModal";


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
    serial: Number(index+1),
    _id: subscription?._id,
    planType: subscription?.planType,
    price: subscription?.price,
    duration: subscription?.duration,
    details: subscription?.details
  }))


  const columns = [
    {
      title: "S.N.",
      dataIndex: "serial",
      key: "serial",
      width: 60,
    },
    {
      title: "Subscription Plan",
      dataIndex: "planType",
      key: "planType",
      width: 180,
      render: (text: string) => (
        <>
          <p className="truncate capitalize">{text}</p>
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
      title: "Features",
      dataIndex: "details",
      key: "details",
      width: 300,
      render: (features: string[]) => (
        <>
          {features?.map((feature, i) => (
            <p key={i} className="truncate">{Number(i+1)}. {feature}</p>
          ))}
        </>
      ),
    },
    {
      title: "Action",
      width: 150,
      dataIndex: "_id",
      key: "_id",
      render: (subscriptionId: string, record: ISubscription) => (
       <div className="flex gap-x-2 items-center">
        <EditSubscriptionModal subscription={record}/>
        <DeleteSubscriptionModal subscriptionId={subscriptionId}/>
       </div>
      ),
    },
  ];




  return (
    <>
      <div className="w-full overflow-auto overflow-x-auto">
        <Table
          size="small"
          columns={columns}
          dataSource={dataSource}
          rowKey="_id"
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
