import { Form, Input } from "antd";
import SubmitButton from "../../components/form/SubmitButton";
import { useForgotPasswordResetMutation } from "../../redux/features/auth/authApi";
import { getEmail } from "../../helper/SessionHelper";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { SetResetPasswordError } from "../../redux/features/auth/authSlice";
import FormError from "../../components/validation/FormError";

interface SetNewPasswordFormValues {
    newPassword: string;
    confirmPassword: string;
}

const SetNewPassword: React.FC = () => {
    const [forgotPassReset, { isLoading }] = useForgotPasswordResetMutation();
    const dispatch = useAppDispatch()
    const { ResetPasswordError } = useAppSelector((state) => state.auth);
    const [form] = Form.useForm();


    const onFinish = (values: SetNewPasswordFormValues) => {
        dispatch(SetResetPasswordError(""))
        forgotPassReset({
            email: getEmail(),
            newPassword: values.newPassword
        });
    };

    return (
        <div className="h-screen bg-barColor">
            {/* Background Image */}
            <div className="bg-primary py-14 h-full">
                {/* Form Container */}
                <div className="relative z-10 flex items-center justify-center h-full px-3 text-white">
                    <div className="bg-[#ffffff] text-black overflow-hidden shadow-lg w-full md:max-w-[500px] rounded-lg">
                        {/* Login Form */}
                        <div className="p-8 md:py-24">
                            <div className="text-center">
                                <h1 className="text-3xl font-semibold mt-6 mb-4">
                                    Set New Password
                                </h1>
                                <p className="mb-8 px-2 md:px-10">
                                    Create a new password. Ensure it differs from
                                    previous ones for security
                                </p>
                            </div>
                            {ResetPasswordError && <FormError message={ResetPasswordError} />}
                            <Form
                                form={form}
                                onFinish={onFinish}
                                name="dependencies"
                                autoComplete="off"
                                style={{ maxWidth: 600 }}
                                layout="vertical"
                            >
                                <Form.Item
                                    label="New Password"
                                    name="newPassword"
                                    rules={[
                                        { required: true, message: "Please enter new password!" }]}
                                >
                                    <Input.Password
                                        placeholder="New Password"
                                        className="rounded-none py-2"
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    dependencies={['newPassword']}
                                    rules={[
                                        { required: true, message: "Please enter confirm Password" },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('newPassword') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('The new password that you entered do not match!'));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password
                                        placeholder="Confirm Password"
                                        className="rounded-none py-2"
                                    />
                                </Form.Item>

                                <Form.Item className="text-center mt-6">
                                    <SubmitButton isLoading={isLoading}>Submit</SubmitButton>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SetNewPassword;