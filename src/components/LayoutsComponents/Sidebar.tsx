import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import {
  RiBarChartGroupedLine,
  RiDashboard3Line,
  RiSettings2Line,
  RiUserLine,
} from 'react-icons/ri';
import { IoAnalyticsOutline } from 'react-icons/io5';
import { MdOutlineCategory, MdOutlineReport } from 'react-icons/md';
import { PiHandWithdrawBold } from 'react-icons/pi';
import { CiLogout } from 'react-icons/ci';

import logo from '../../assets/logo.svg';
import { logout } from '../../helper/SessionHelper';

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  return (
    <div className='fixed'>
      <Sider
      width={250}
      collapsedWidth={80}
      trigger={null}
      collapsible
      collapsed={collapsed}
      className="h-screen! bg-barColor fixed top-0 left-0 flex flex-col justify-between"
    >
      {/* Scrollable Menu Section */}
      <div className="flex flex-col h-full overflow-hidden">
        {/* Logo */}
        <div className="flex justify-center items-center py-6 shrink-0">
          <Link to={`/`}>
            <img src={logo} alt="Logo" className="w-16" />
          </Link>
        </div>

        {/* Menu (scrollable) */}
        <div className="flex-1 overflow-y-auto px-2 custom-menu">
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
                icon: <RiDashboard3Line className="w-6 h-6" />,
                label: <Link to="/">Dashboard</Link>,
              },
              {
                key: '3',
                icon: <IoAnalyticsOutline className="w-6 h-6" />,
                label: <Link to="/banners">Banners</Link>,
              },
              {
                key: '4',
                icon: <RiBarChartGroupedLine className="w-6 h-6" />,
                label: <Link to="/subscriptions">Subscriptions</Link>,
              },
              {
                key: '5',
                icon: <RiBarChartGroupedLine className="w-6 h-6" />,
                label: <Link to="/income/transaction-history">Transaction History</Link>,
              },
              {
                key: '6',
                icon: <PiHandWithdrawBold className="w-6 h-6" />,
                label: <Link to="/withdraw-list">Withdraw List</Link>,
              },
              {
                key: '7',
                icon: <RiUserLine className="w-6 h-6" />,
                label: <Link to="/contractor-manage">Contractor Manage</Link>,
              },
              {
                key: '8',
                icon: <RiUserLine className="w-6 h-6" />,
                label: <Link to="/customer-manage">Customer Manage</Link>,
              },
              {
                key: '9',
                icon: <MdOutlineCategory className="w-6 h-6" />,
                label: <Link to="/manage">Category Manage</Link>,
              },
              {
                key: '10',
                icon: <MdOutlineReport className="w-6 h-6" />,
                label: <Link to="/report">Help & Support</Link>,
              },
              {
                key: '11',
                icon: <RiSettings2Line className="w-6 h-6" />,
                label: 'Settings',
                children: [
                  { key: '11-1', label: <Link to="/settings/profile">Profile</Link> },
                  { key: '11-2', label: <Link to="/settings/about-us">About Us</Link> },
                  { key: '11-3', label: <Link to="/settings/privacy-policy">Privacy Policy</Link> },
                  { key: '11-4', label: <Link to="/settings/terms-and-condtion">Terms & Condition</Link> },
                ],
              },
            ]}
          />
        </div>

        {/* Logout Button (fixed at bottom) */}
        <div className="p-4 border-t border-gray-200 bg-barColor">
          <button
            onClick={logout}
            className="w-full py-2 bg-[#f6f6f6] hover:bg-gray-100 shadow-md rounded-lg flex justify-center items-center gap-3 cursor-pointer transition-all duration-200"
          >
            <CiLogout className="w-6 h-6 text-[#222]" />
            {!collapsed && <p className="text-base font-medium text-[#222]">Log Out</p>}
          </button>
        </div>
      </div>
    </Sider>
    </div>
  );
};

export default Sidebar;
