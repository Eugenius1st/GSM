// hooks
import { Route, Routes } from 'react-router-dom';
// layouts Admin
import AdminHome from 'layouts/Admin/Home';
import AdminCoach from 'layouts/Admin/Coach';
import AdminCoachDetail from 'layouts/Admin/Coach/CoachDetail';
import AdminCoachEdit from 'layouts/Admin/Coach/CoachEdit';
import AdminCoachClass from 'layouts/Admin/Coach/CoachClass';
import AdminCoachClassDetail from 'layouts/Admin/Coach/CoachClassDetail';
import AdminUser from 'layouts/Admin/User';
import AdminUserDetail from 'layouts/Admin/User/UserDetail';
import AdminUserEdit from 'layouts/Admin/User/UserEdit';
import AdminClass from 'layouts/Admin/Class';
import AdminClassDetail from 'layouts/Admin/Class/ClassDetail';
import AdminClassEdit from 'layouts/Admin/Class/ClassEdit';
import AdminRegist from 'layouts/Admin/Regist/AdminRegist';
import AdminRegistUser from 'layouts/Admin/Regist/UserRegist';
import AdminNotifiaction from 'layouts/Admin/Notification';
// layouts User
import UserHome from 'layouts/User/Home';
import UserClass from 'layouts/User/Class';
import UserClassDetail from 'layouts/User/Class/ClassDetail';
import UserMypage from 'layouts/User/Mypage';
import UserAlarm from 'layouts/User/Alarm';
// layouts Login
import Login from 'layouts/Login';
import Logout from 'layouts/Logout';
// recoil
import { useRecoilValue } from 'recoil';
import { LoginStateSelector } from 'atom/auth';

export const adminRoutes = [
    {
        path: '/',
        element: <Login />,
        //   errorElement: <ErrorPage />,
    },
    {
        path: '/logout',
        element: <Logout />,
    },
    // admin
    {
        path: '/admin',
        element: <AdminHome />,
    },
    // admin coach
    {
        path: '/admin/coach',
        element: <AdminCoach />,
    },
    {
        path: '/admin/coach/:coachId',
        element: <AdminCoachDetail />,
    },
    {
        path: '/admin/coach/edit/:coachId',
        element: <AdminCoachEdit />,
    },
    {
        path: '/admin/coach/coach-class/:coachId',
        element: <AdminCoachClass />,
    },
    {
        path: '/admin/coach/coach-class-detail/:classId',
        element: <AdminCoachClassDetail />,
    },
    // admin user
    {
        path: '/admin/user',
        element: <AdminUser />,
    },
    {
        path: '/admin/user/:userId',
        element: <AdminUserDetail />,
    },
    {
        path: '/admin/user/edit/:userId',
        element: <AdminUserEdit />,
    },
    // admin class
    {
        path: '/admin/class',
        element: <AdminClass />,
    },
    {
        path: '/admin/class/:classId',
        element: <AdminClassDetail />,
    },
    {
        path: '/admin/class/edit/:classId',
        element: <AdminClassEdit />,
    },
    // admin regist
    {
        path: '/admin/regist',
        element: <AdminRegist />,
    },
    {
        path: '/admin/regist/user',
        element: <AdminRegistUser />,
    },
    // admin notification
    {
        path: '/admin/notification/:category',
        element: <AdminNotifiaction />,
    },
];
export const userRoutes = [
    {
        path: '/',
        element: <Login />,
        //   errorElement: <ErrorPage />,
    },
    {
        path: '/logout',
        element: <Logout />,
    },
    // user
    {
        path: '/user',
        element: <UserHome />,
    },
    {
        path: '/user/class',
        element: <UserClass />,
    },
    {
        path: '/user/class/:classId',
        element: <UserClassDetail />,
    },
    {
        path: '/user/mypage',
        element: <UserMypage />,
    },
    {
        path: '/user/alarm',
        element: <UserAlarm />,
    },
];

const getRoutes = (routes: any) => {
    return routes.map((route: any, index: number) => {
        return (
            <Route
                key={route.path || index}
                path={route.path}
                element={route.element}
            >
                {route.children && getRoutes(route.children)}
            </Route>
        );
    });
};

const App = () => {
    const loginState = useRecoilValue(LoginStateSelector);
    return <Routes>{getRoutes(loginState === 'admin' ? adminRoutes : userRoutes)}</Routes>;
};

export default App;
