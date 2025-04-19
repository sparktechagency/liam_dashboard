import { Link } from "react-router-dom";

const PasswordChangedSuccessfull: React.FC = () => {
    return (
        <div className="h-screen bg-barColor">
            {/* Background Image */}
            <div className="bg-primary  h-full">
                {/* Form Container */}
                <div className="relative z-10 flex items-center justify-center h-full px-3 text-white">
                    <div className="bg-[#ffffff] text-black overflow-hidden shadow-lg w-full md:max-w-[500px] rounded-lg">
                        {/* Login Form */}
                        <div className="p-8 py-[100px] md:py-[100px] text-center">
                            <h2 className="text-2xl font-semibold mb-8">Congratulations</h2>
                            <p className=" text-center">
                                Your password has been updated. Please change your password
                                regularly to avoid this happening.
                            </p>
                            <Link to={`/auth/login`}>
                                <button
                                    type="button"
                                    className="bg-primary bg-primaryColor cursor-pointer  mt-8 text-white px-18 rounded-lg py-[6px] text-lg"
                                >
                                    Continue
                                </button>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default PasswordChangedSuccessfull;
