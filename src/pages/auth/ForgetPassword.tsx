import { Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { FormProps } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { useForgotPasswordSendOtpMutation } from "../../redux/features/auth/authApi";
import Error from "../../components/validation/Error";
import { SetForgotError } from "../../redux/features/auth/authSlice";
import SubmitButton from "../../components/form/SubmitButton";
import { useEffect } from "react";

interface ForgotPasswordFormValues {
    email: string;
}

const ForgotPassword: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { ForgotError } = useAppSelector((state) => state.auth);
    const [forgotPasswordSendOtp, { isLoading, isSuccess }] =
        useForgotPasswordSendOtpMutation();

    useEffect(() => {
        if (isSuccess) {
            navigate("/auth/verification-code");
        }
    }, [isSuccess, navigate])

    const onFinish: FormProps<ForgotPasswordFormValues>["onFinish"] = (values) => {
        dispatch(SetForgotError(""))
        forgotPasswordSendOtp(values)
    };

    return (
        <div className="h-screen bg-barColor">
            {/* Background Image */}
            <div className="bg-primary py-12 h-full">
                {/* Form Container */}
                <div className="relative z-10 flex items-center justify-center h-full px-3 text-white">
                    <div className="bg-[#ffffff] text-black overflow-hidden shadow-lg w-full md:max-w-[500px] rounded-lg">
                        {/* Login Form */}
                        <div className="p-8 md:py-36">
                            <div className="text-center">
                                <h1 className="text-2xl md:text-3xl font-semibold mt-6 mb-4">
                                    Forgot Password
                                </h1>
                                <p className=" mb-8">
                                    Please enter your email to continue
                                </p>
                            </div>
                             {ForgotError && <Error message={ForgotError} />}
                            <Form<ForgotPasswordFormValues>
                                name="basic"
                                layout="vertical"
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                            >
                                <Form.Item
                                    label="Email Address"
                                    name="email"
                                    rules={[
                                        { required: true, message: "Please input your email!" },
                                        {
                                            type: 'email',
                                            message: 'Invalid email address',
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder="Enter your email"
                                        className="rounded-none py-2"
                                    />
                                </Form.Item>

                                <Form.Item className="text-center mt-6">
                                    <SubmitButton isLoading={isLoading} loadingTitle="Sending..."> Send Code</SubmitButton>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
