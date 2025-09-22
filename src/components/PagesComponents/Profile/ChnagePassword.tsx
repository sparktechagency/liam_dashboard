import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { useChangePasswordMutation } from "../../../redux/features/auth/authApi";
import { Form, Input } from "antd";
import { SetChangePasswordError } from "../../../redux/features/auth/authSlice";
import SubmitButton from "../../form/SubmitButton";
import FormError from "../../validation/FormError";

interface ChangePasswordFormValues {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

const ChangePassword: React.FC = () => {
    const dispatch = useAppDispatch()
    const { ChangePasswordError } = useAppSelector((state) => state.auth);
    const [changePassword, { isLoading }] = useChangePasswordMutation();

    const onFinish = (values: ChangePasswordFormValues) => {
        dispatch(SetChangePasswordError(""))
        changePassword({
            oldPassword: values.oldPassword,
            newPassword: values.newPassword
        })
    };



    return (
        <div className="bg-white px-20 w-[715px] pt-5 pb-5 rounded-md">
            <p className="text-primary text-center font-bold text-xl mb-5">
                Change Password
            </p>
            {ChangePasswordError && <FormError message={ChangePasswordError} />}
            <Form<ChangePasswordFormValues>
                name="basic"
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    label="Old Password"
                    name="oldPassword"
                    rules={[{ required: true, message: "Old password is required!" }]}
                >
                    <Input.Password
                        placeholder="Enter your old password"
                        className="rounded-none py-2"
                    />
                </Form.Item>
                <Form.Item
                    label="New Password"
                    name="newPassword"
                    dependencies={['oldPassword']}
                    rules={[
                        { required: true, message: "New password is required!" },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('oldPassword') != value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error(`Old password & New passord can't be same`));
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        placeholder="Enter new password"
                        className="rounded-none py-2"
                    />
                </Form.Item>
                <Form.Item
                    label="Confirm New Password"
                    name="confirmPassword"
                    dependencies={['newPassword']}
                    rules={[
                        { required: true, message: "Confirm new password is required" },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('newPassword') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Passwords do not match'));
                            },
                        }),
                    ]}
                >
                  <Input.Password
                      placeholder="Confirm Password"
                      className="rounded-none py-2"
                    />
                </Form.Item>
                <SubmitButton isLoading={isLoading}>Save Change</SubmitButton>
            </Form>
        </div>
    );
};

export default ChangePassword;
