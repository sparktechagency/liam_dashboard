import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Dashboard from '../pages/dashboard/Dashboard';
import LogIn from '../pages/auth/Login';
import Income from '../pages/income/Income';
import ForgotPassword from '../pages/auth/ForgetPassword';
import VerificationCode from '../pages/auth/VerificationCode';
import SetNewPassword from '../pages/auth/SetNewPassword';
import PasswordChangedSuccessfull from '../pages/auth/PasswordChangedSuccessfull';
import Profile from '../pages/profile/Profile';
import Notification from '../pages/notification/Notification';
import PrivacyPolicy from '../pages/settings/privacy-policy/PrivacyPolicy';
import AboutUs from '../pages/settings/about-us/AboutUs';
import TermsAndCondition from '../pages/settings/terms-and-conditon/TermsAndCondition';
import Subscriptions from '../pages/subscriptions/Subscriptions';
import UserDetails from '../pages/userDetails/UserDetails';
import Manage from '../pages/manage/Manage';
import ManageService from '../pages/manageService/ManageService';


const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Dashboard></Dashboard>,
            },
            {
                path: "/income",
                element: <Income></Income>,
            },
            {
                path: "/user-details",
                element: <UserDetails></UserDetails>,
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
        path: "/auth/login",
        element: <LogIn></LogIn>,
    },
    {
        path: "/auth/forgot-password",
        element: <ForgotPassword></ForgotPassword>,
    },
    {
        path: "/auth/verification-code",
        element: <VerificationCode></VerificationCode>,
    },
    {
        path: "/auth/set-new-password",
        element: <SetNewPassword></SetNewPassword>,
    },
    {
        path: "/auth/successfully-changed-password",
        element: <PasswordChangedSuccessfull></PasswordChangedSuccessfull>,
    },

]);

export default router;