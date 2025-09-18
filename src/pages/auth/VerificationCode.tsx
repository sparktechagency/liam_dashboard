import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { useForgotPasswordResendOtpMutation, useForgotPasswordVerifyOtpMutation } from "../../redux/features/auth/authApi";
import Error from "../../components/validation/Error";
import CustomButton from "../../components/form/CustomButton";
import { SetVerifyOtpError } from "../../redux/features/auth/authSlice";
import { getEmail } from "../../helper/SessionHelper";
import { useNavigate } from "react-router-dom";

const VerificationCode: React.FC = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState<string>("");
    const dispatch = useAppDispatch();
    const { VerifyOtpError } = useAppSelector((state) => state.auth);
    const [forgotPasswordVerifyOtp, { isLoading, isSuccess: verifySuccess }] =
        useForgotPasswordVerifyOtpMutation();

    const [
        forgotPasswordResendOtp,
        { isLoading: resendLoading },
    ] = useForgotPasswordResendOtpMutation();

    //if verify success
    useEffect(() => {
        if (verifySuccess) {
            navigate("/auth/set-new-password");
        }
    }, [verifySuccess, navigate]);

    const handleVerify = () => {
        dispatch(SetVerifyOtpError(""))
        forgotPasswordVerifyOtp({
            email: getEmail(),
            otp
        });
    };

    const handleResend = () => {
        forgotPasswordResendOtp({
             email: getEmail()
        });
    }

    return (
        <div className="h-screen bg-barColor">
            {/* Background Image */}
            <div className="bg-primary py-14 h-full">
                {/* Form Container */}
                <div className="relative z-10 flex items-center justify-center h-full px-3 text-white">
                    <div className="bg-[#ffffff] text-black overflow-hidden shadow-lg w-full md:max-w-[500px] rounded-lg">
                        {/* Login Form */}
                        <div className="p-8 md:py-32">
                            <div className="text-center">
                                <h1 className="text-2xl md:text-3xl font-semibold mt-6 mb-5">
                                    Check Your Email
                                </h1>
                                <p className=" mb-8 px-2 md:px-10">
                                    We sent a reset link to contact@dscode...com
                                    enter 5 digit code that mentioned in the email
                                </p>
                            </div>

                            {VerifyOtpError && <Error message={VerifyOtpError} />}
                            <div className="flex justify-center">
                                <div className="flex gap-2 mb-4">
                                    <OtpInput
                                        value={otp}
                                        onChange={(value: string) => setOtp(value)}
                                        numInputs={4}
                                        renderSeparator={<span className="w-4" />}
                                        renderInput={(props) => (
                                            <input
                                                {...props}
                                                style={{ width: "50px" }}
                                                className="w-12 h-12 border-2 border-gray-300 rounded-md text-center text-lg focus:border-[#42004a] focus:outline-none"
                                            />
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-center">                                  
                                <CustomButton isLoading={isLoading} disabled={isLoading || otp?.length < 4} loadingTitle="Verifying..." onClick={handleVerify}>Verify Code</CustomButton>
                            </div>
                            <p className="text-center text-gray-600">
                                You have not received the email?{" "}
                                <span onClick={handleResend} className="text-[#020202] cursor-pointer">
                                    {resendLoading ? "Resending..." : "Resend"}
                                </span>
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerificationCode;
