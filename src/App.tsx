// hooks
import { Route, Routes } from 'react-router-dom';
// layouts Admin
import AdminHome from 'layouts/Admin/Home';
import AdminCoach from 'layouts/Admin/Coach';
import AdminCoachDetail from 'layouts/Admin/Coach/CoachDetail';
import AdminCoachClass from 'layouts/Admin/Coach/CoachClass';
import AdminCoachClassDetail from 'layouts/Admin/Coach/CoachClassDetail';
import AdminUser from 'layouts/Admin/User';
import AdminUserDetail from 'layouts/Admin/User/UserDetail';
import AdminClass from 'layouts/Admin/Class';
import AdminClassDetail from 'layouts/Admin/Class/ClassDetail';
import AdminRegist from 'layouts/Admin/Regist';
import AdminNotifiaction from 'layouts/Admin/Notification';
// layouts User
import UserHome from 'layouts/User/Home';
import UserClass from 'layouts/User/Class';
import UserClassDetail from 'layouts/User/Class/ClassDetail';
import UserMypage from 'layouts/User/Mypage';
import UserAlarm from 'layouts/User/Alarm';
// import User
// layouts Login
import Login from 'layouts/Login';
import Logout from 'layouts/Logout';
const App = () => {
    return (
        <Routes>
            {/* admin */}
            <Route
                path="/admin"
                element={<AdminHome />}
            />
            <Route
                path="/admin/coach"
                element={<AdminCoach />}
            />
            <Route
                path="/admin/coach/:coachId"
                element={<AdminCoachDetail />}
            />
            <Route
                path="/admin/coach/coach-class/:coachId"
                element={<AdminCoachClass />}
            />
            <Route
                path="/admin/coach/coach-class/:coachId/:classId"
                element={<AdminCoachClassDetail />}
            />
            <Route
                path="admin/user"
                element={<AdminUser />}
            />
            <Route
                path="/admin/user/:userId"
                element={<AdminUserDetail />}
            />
            <Route
                path="/admin/class"
                element={<AdminClass />}
            />
            <Route
                path="/admin/class/:calssId"
                element={<AdminClassDetail />}
            />
            <Route
                path="/admin/regist"
                element={<AdminRegist />}
            />
            <Route
                path="/admin/notification"
                element={<AdminNotifiaction />}
            />
            {/* user */}
            <Route
                path="/user"
                element={<UserHome />}
            />
            <Route
                path="/user/class"
                element={<UserClass />}
            />{' '}
            <Route
                path="/user/class/:classId"
                element={<UserClassDetail />}
            />
            <Route
                path="/user/mypage"
                element={<UserMypage />}
            />
            <Route
                path="/user/alarm"
                element={<UserAlarm />}
            />
            {/* login */}
            <Route
                path="/logout"
                element={<Logout />}
            />
            <Route
                path="/"
                element={<Login />}
            />
        </Routes>
    );
};

export default App;
