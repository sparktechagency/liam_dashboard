/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, InputNumber } from "antd"
import SubmitButton from "../form/SubmitButton"
import { useCreateUpdateCostMutation, useGetPercentageQuery } from "../../redux/features/dashboard/dashboardApi";
import UpdateCostLoading from "../loader/UpdateCostLoading";

const PercentageForm = () => {
    const {data, isLoading: percentageLoading} = useGetPercentageQuery(undefined);
    const [createUpdateCost, { isLoading }] = useCreateUpdateCostMutation();
    const [form] = Form.useForm();
    
    const onFinish = (values: any) => {
        createUpdateCost(values)
    };

    if(percentageLoading){
        return <UpdateCostLoading/>
    }

    return (
        <>
            <div className="flex justify-center items-center border-t border-gray-300 mt-4 p-4">
                <div className="min-w-2xl space-y-2">
                    <h1 className="font-semibold">Update Cost</h1>
                    <Form
                        form={form}
                        initialValues={{
                            cost: data?.data?.cost
                        }}
                        onFinish={onFinish}
                        layout="vertical"
                    >
                        <Form.Item
                            name="cost"
                            label="Cost (%)"
                            rules={[
                                { required: true, message: "Please enter the input value !" },
                                {
                                    type: "number",
                                    min: 1,
                                    message: "Cost value must be greater than 0",
                                },
                            ]}
                        >
                            <InputNumber
                                style={{ width: "100%" }}
                                disabled={percentageLoading}
                                min={0} 
                                placeholder="Enter cost value"
                            />
                        </Form.Item>
                        <SubmitButton isLoading={isLoading}>Update</SubmitButton>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default PercentageForm