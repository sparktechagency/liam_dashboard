import { Layout, theme } from 'antd';
import { RxHamburgerMenu } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
import { useGetMeQuery } from '../../redux/features/user/userApi';
import { useAppSelector } from '../../redux/hooks/hooks';
import UserLoading from '../loader/UserLoading';
import profile_placeholder from "../../assets/profile_placeholder.png";

// import { RxHamburgerMenu } from "react-icons/rx";
const { Header } = Layout;

interface MainHeaderProps {
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
    collapsed: boolean;
}

const MainHeader: React.FC<MainHeaderProps> = ({ setCollapsed, collapsed }) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

  const navigate = useNavigate();
  const { isLoading, isFetching } = useGetMeQuery(undefined);
  const { user } = useAppSelector((state) => state.user);

    return (
        <div >
            <Header
                style={{
                    padding: 0,
                    background: colorBgContainer,
                }}
            >
                <div className='flex justify-end items-center pr-4  bg-barColor'>

                    {collapsed ? <RxHamburgerMenu onClick={() => setCollapsed(!collapsed)} className=' text-black w-8 h-8 cursor-pointer hidden' /> : <RxHamburgerMenu onClick={() => setCollapsed(!collapsed)} className=' text-black w-8 h-8 cursor-pointer hidden' />}
                    <div className='flex items-center gap-6'>
                        {/* <div>
                            <Link className='flex items-center' to={`/notification`}>
                                <div className=' relative mt-[4px]'>
                                    <IoNotificationsOutline className="w-7 h-7 text-primaryColor ">
                                    </IoNotificationsOutline>
                                    <span className="absolute -top-2 -right-[5px] bg-[#0e0e0eab] text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold">
                                        10
                                    </span>
                                </div>
                            </Link>
                        </div> */}
                        {/* <Link to={`/settings/profile`}>
                            <div className=' flex items-center gap-2 cursor-pointer '>
                                <Avatar src={`https://avatar.iran.liara.run/public/24`} size={40} className=' ring-1 ring-[#1c4587]' />
                                <p className=' text-black font-semibold'>TA Emon</p>
                            </div>
                        </Link> */}
                        <div
                            onClick={() => navigate("/profile")}
                            className="flex items-center gap-2 cursor-pointer py-3"
                        >
                            {isLoading || isFetching ? (
                                <UserLoading />
                            ) : (

                                <>
                                    <img
                                        src={user?.img ? user?.img : profile_placeholder}
                                        alt="Profile"
                                        onError={(e) => {
                                            e.currentTarget.onerror = null;
                                            e.currentTarget.src = profile_placeholder;
                                        }}
                                        className="w-9 h-9 rounded-full object-cover"
                                    />

                                    <span className="text-gray-800 font-medium">{user?.fullName}</span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </Header>
        </div>
    );
};

export default MainHeader;