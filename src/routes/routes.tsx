import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Dashboard from '../pages/dashboard/DashboardPage';
import LogIn from '../pages/auth/Login';
import Income from '../pages/income/Income';
import ForgotPassword from '../pages/auth/ForgetPassword';
import VerificationCode from '../pages/auth/VerificationCode';
import SetNewPassword from '../pages/auth/SetNewPassword';
import Profile from '../pages/profile/Profile';
import Notification from '../pages/notification/Notification';
import PrivacyPolicy from '../pages/settings/privacy-policy/PrivacyPolicy';
import AboutUs from '../pages/settings/about-us/AboutUs';
import TermsAndCondition from '../pages/settings/terms-and-conditon/TermsAndCondition';
import Manage from '../pages/manage/Manage';
import ManageService from '../pages/manageService/ManageService';
import ContractorRequestPage from '../pages/contractorRequestPage/ContractorRequestPage';
import TransactionHistory from '../pages/transactionHistory/transactionHistory';
import CustomerManage from '../pages/customerManage/CustomerManage';
import ContractorManage from '../pages/contractorManage/ContractorManage';
import Report from '../pages/report/Report';
import AuthLayout from '../components/LayoutsComponents/AuthLayout';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Subscriptions from '../pages/subscriptions/Subscriptions';


const router = createBrowserRouter([
    {
        path: '/',
        element: <PrivateRoute>
            <MainLayout />
        </PrivateRoute>,
        children: [
            {
                path: "/",
                element: <Dashboard></Dashboard>,
            },
            {
                path: "/contractor-request",
                element: <ContractorRequestPage></ContractorRequestPage>,
            },
            {
                path: "/income",
                element: <Income></Income>,
            },
            {
                path: "/income/transaction-history",
                element: <TransactionHistory></TransactionHistory>,
            },
            {
                path: "/customer-manage",
                element: <CustomerManage></CustomerManage>,
            },
            {
                path: "/contractor-manage",
                element: <ContractorManage></ContractorManage>,
            },
            {
                path: "/subscriptions",
                element: <Subscriptions></Subscriptions>,
            },
            {
                path: "/manage",
                element: <Manage></Manage>,
            },
            {
                path: "/report",
                element: <Report></Report>,
            },
            {
                path: "/manage-service",
                element: <ManageService></ManageService>,
            },
            {
                path: "/settings/profile",
                element: <Profile></Profile>,
            },
            {
                path: "/settings/privacy-policy",
                element: <PrivacyPolicy></PrivacyPolicy>,
            },
            {
                path: "/settings/about-us",
                element: <AboutUs></AboutUs>,
            },
            {
                path: "/settings/terms-and-condtion",
                element: <TermsAndCondition></TermsAndCondition>,
            },
            {
                path: "/notification",
                element: <Notification></Notification>,
            },
        ]
    },
    {
        path: '/auth',
        element: <PublicRoute> <AuthLayout/> </PublicRoute>,
        children: [
            {
                index: true,
                element: <Navigate to="/auth/login" replace/>
            },
            {
                path: "login",
                element: <LogIn></LogIn>,
            },
            {
                path: "forgot-password",
                element: <ForgotPassword></ForgotPassword>,
            },
            {
                path: "verification-code",
                element: <VerificationCode></VerificationCode>,
            },
            {
                path: "set-new-password",
                element: <SetNewPassword></SetNewPassword>,
            },
        ]
    },
    {
        path: '/*',
        element: <h1>Not Found Page</h1>,
    }
   
]);

export default router;