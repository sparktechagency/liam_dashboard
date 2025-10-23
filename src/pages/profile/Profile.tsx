/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { FaCamera } from "react-icons/fa";
import { Avatar, Upload } from "antd";
import EditProfile from "../../components/PagesComponents/Profile/EditProfile";
import ChangePassword from "../../components/PagesComponents/Profile/ChnagePassword";
import profile_placeholder from "../../assets/profile_placeholder.png";
import { useGetMeQuery } from "../../redux/features/user/userApi";
import { useAppSelector } from "../../redux/hooks/hooks";
import ProfileLoading from "../../components/loader/ProfileLoading";

type Tab = "editProfile" | "changePassword";

const Profile: React.FC = () => {
    const [profilePic, setProfilePic] = useState<File | null>(null);
    const [activeTab, setActiveTab] = useState<Tab>("editProfile");
    const { user } = useAppSelector((state) => state.user);
    const [imageSrc, setImageSrc] = useState(user?.img || profile_placeholder);
    const { isLoading, isError } = useGetMeQuery(undefined);


    const handleProfilePicUpload = (e: any) => {
        const file = e.file;
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImageSrc(reader.result as string);
            reader.readAsDataURL(file);
            setProfilePic(e.file);
        }
    };


    if (isLoading) {
        return <ProfileLoading />
    }

    if (!isLoading && isError) {
        return <h1>Server Error Occured</h1>
    }

    if (!isLoading && !isError && user) {
        return (
            <div className="h-screen bg-white rounded-md">
                <div className="px-5 pb-5 h-full">
                    <div className="mx-auto flex flex-col justify-center items-center">
                        <div className="flex justify-center items-center bg-primary mt-5 text-white w-[715px] mx-auto p-5 gap-5 rounded-md">
                            <div className="relative">
                                <Avatar
                                    size={140}
                                    src={imageSrc}
                                    className="border-4 border-buttonPrimary shadow-xl"
                                />
                                {activeTab === "editProfile" && (
                                    <Upload
                                        showUploadList={false}
                                        beforeUpload={() => false}
                                        onChange={handleProfilePicUpload}
                                        className="absolute bottom-2 right-2 bg-[#43004ac0] px-4 py-[5px] rounded-full cursor-pointer"
                                    >
                                        <FaCamera className="text-white mt-[5px] w-6" />
                                    </Upload>
                                )}
                            </div>
                            <div>
                                <p className="text-xl md:text-2xl text-black font-bold capitalize">{user?.fullName}</p>
                                {/* <p className="text-sm text-black font-semibold">Super Admin</p> */}
                            </div>
                        </div>
                        <div className="flex justify-center items-center gap-5 text-md md:text-xl font-semibold my-5">
                            <p
                                onClick={() => setActiveTab("editProfile")}
                                className={`cursor-pointer pb-1 ${activeTab === "editProfile"
                                    ? "text-primary border-b-2 border-primary"
                                    : "text-[#575757]"
                                    }`}
                            >
                                Edit Profile
                            </p>
                            <p
                                onClick={() => setActiveTab("changePassword")}
                                className={`cursor-pointer pb-1 ${activeTab === "changePassword"
                                    ? "text-primary border-b-2 border-primary"
                                    : "text-[#575757]"
                                    }`}
                            >
                                Change Password
                            </p>
                        </div>
                        <div className="flex justify-center items-center p-5 rounded-md">
                            <div className="w-full max-w-3xl">
                                {activeTab === "editProfile" && <EditProfile profilePic={profilePic} user={user}/>}
                                {activeTab === "changePassword" && <ChangePassword />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Profile;
