import { Layout, Menu, } from 'antd';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg'
import { CiLogout } from 'react-icons/ci';

const { Sider } = Layout;

import React from 'react';
import { RiBarChartGroupedLine, RiDashboard3Line, RiSettings2Line, RiUserLine } from 'react-icons/ri';
import { IoAnalyticsOutline } from 'react-icons/io5';
import { MdOutlineCategory, MdOutlineReport } from 'react-icons/md';
import { logout } from '../../helper/SessionHelper';

interface SidebarProps {
    collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {


    return (
        <div className='fixed top-0 left-0 bottom-0 bg-barColor '>
            <Sider className='h-[100vh] w-[300px] overflow-y-scroll bg-barColor' width={250} collapsedWidth={80} trigger={null} collapsible collapsed={collapsed}>
                <div className=' flex justify-center items-center py-6 '>
                    <Link to={`/`}><img src={logo} className=' w-16' /></Link>
                </div>

                <Menu
                    mode="inline"
                    className='px-2 custom-menu'
                    // selectedKeys={[location.pathname]}
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            // icon: <img src={location.pathname === '/' ? dashboardActive : dashboard} className='menu-icon' />,
                            // icon: <img src={dashboard} className='menu-icon text-primaryColor' />,
                            icon: <RiDashboard3Line className='w-6 h-6' />,
                            label: <Link className=' text-[16px]' to={`/`}>Dashboard</Link>,
                        },
                        {
                            key: '2',
                            // icon: <img src={location.pathname === '/' ? dashboardActive : dashboard} className='menu-icon' />,
                            // icon: <img src={income} className='menu-icon' />,
                            icon: <IoAnalyticsOutline className='w-6 h-6' />,
                            label: <Link className=' text-[16px]' to={`/income`}>Income</Link>,
                        },
                        {
                            key: '3',
                            // icon: <img src={location.pathname === '/' ? dashboardActive : dashboard} className='menu-icon' />,
                            // icon: <img src={income} className='menu-icon' />,
                            icon: <IoAnalyticsOutline className='w-6 h-6' />,
                            label: <Link className=' text-[16px]' to={`/banners`}>Banners</Link>,
                        },
                        {
                            key: '4',
                            // icon: <img src={location.pathname === '/' ? dashboardActive : dashboard} className='menu-icon' />,
                            icon: <RiBarChartGroupedLine className='w-6 h-6' />,
                            label: <Link className=' text-[16px]' to={`/subscriptions`}>Subscriptions</Link>,
                        },
                        {
                            key: '5',
                            // icon: <img src={location.pathname === '/' ? dashboardActive : dashboard} className='menu-icon' />,
                            icon: <RiBarChartGroupedLine className='w-6 h-6' />,
                            label: <Link className=' text-[16px]' to={`/income/transaction-history`}>Transaction History</Link>,
                        },
                        {
                            key: '6',
                            // icon: <img src={location.pathname === '/' ? dashboardActive : dashboard} className='menu-icon' />,
                            icon: <RiUserLine className='w-6 h-6' />,
                            label: <Link className=' text-[16px]' to={`/contractor-manage`}>Contractor Manage</Link>,
                        },
                        {
                            key: '7',
                            // icon: <img src={location.pathname === '/' ? dashboardActive : dashboard} className='menu-icon' />,
                            icon: <RiUserLine className='w-6 h-6' />,
                            label: <Link className=' text-[16px]' to={`/customer-manage`}>Customer Manage</Link>,
                        },
                        {
                            key: '8',
                            // icon: <img src={location.pathname === '/' ? dashboardActive : dashboard} className='menu-icon' />,
                            icon: <MdOutlineCategory className='w-6 h-6' />,
                            label: <Link className=' text-[16px]' to={`/manage`}>Manage</Link>,
                        },
                        // {
                        //     key: '7',
                        //     // icon: <img src={location.pathname === '/' ? dashboardActive : dashboard} className='menu-icon' />,
                        //     icon: <RiUserSettingsLine className='w-6 h-6' />,
                        //     label: <Link className=' text-[16px]' to={`/manage-service`}>Manage Services</Link>,
                        // },
                        {
                            key: '9',
                            // icon: <img src={location.pathname === '/' ? dashboardActive : dashboard} className='menu-icon' />,
                            icon: <MdOutlineReport className='w-6 h-6' />,
                            label: <Link className=' text-[16px]' to={`/report`}>Report</Link>,
                        },
                        {
                            key: '10',
                            // icon: <img src={location.pathname === '/' ? dashboardActive : dashboard} className='menu-icon' />,
                            icon: <RiSettings2Line className='w-6 h-6' />,
                            label: <p className=' text-[16px]'>Settings</p>,
                            children: [
                                {
                                    key: "9-1",
                                    label: <Link className={``} to={`/settings/profile`}>Profile</Link>,
                                },
                                {
                                    key: "9-2",
                                    label: <Link className={``} to={`/settings/about-us`}>About Us</Link>,
                                },
                                {
                                    key: "9-3",
                                    label: <Link className={``} to={`/settings/privacy-policy`}>Privacy Policy</Link>,
                                },
                                {
                                    key: "9-4",
                                    label: <Link className={``} to={`/settings/terms-and-condtion`}>Terms And Condition</Link>,
                                },
                            ]
                        },
                    ]}
                />
            </Sider>
            <div className="flex justify-center items-center relative">
                    <div
                       onClick={()=> logout()}
                        className="absolute bottom-8 w-[80%] py-2 bg-[#f6f6f6] hover:bg-gray-100 shadow-md rounded-lg flex justify-center items-center gap-3 cursor-pointer transition-all duration-200"
                    >
                        <CiLogout className="w-6 h-6 text-[#222]" />
                        <p className="text-base font-medium text-[#222]">Log Out</p>
                    </div>
            </div>

        </div>
    );
};

export default Sidebar;