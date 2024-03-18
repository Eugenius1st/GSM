// layouts
import AdminHome from 'layouts/Admin/Home';
import AdminCoach from 'layouts/Admin/Coach';
import AdminCoachDetail from 'layouts/Admin/Coach/CoachDetail';
import AdminCoachClass from 'layouts/Admin/Coach/CoachClass';
import AdminCoachClassDetail from 'layouts/Admin/Coach/CoachClassDetail';
import AdminUser from 'layouts/Admin/User';
import AdminUserDetail from 'layouts/Admin/User/UserDetail';
import AdminClass from 'layouts/Admin/Class';
import AdminClassDetail from 'layouts/Admin/Class/ClassDetail';
import AdminNotifiaction from 'layouts/Admin/Notification';
// hooks
import { Route, Routes } from 'react-router-dom';

const App = () => {
    return (
        <Routes>
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
                path="/admin/notification"
                element={<AdminNotifiaction />}
            />
        </Routes>
    );
};

export default App;
