// layouts
import AdminHome from 'layouts/Admin/Home';
import AdminCoach from 'layouts/Admin/Coach';
import CoachDetail from 'layouts/Admin/Coach/CoachDetail';
import CoachClass from 'layouts/Admin/Coach/CoachClass';
// hooks
import { Route, Routes } from 'react-router-dom';

const App = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={<AdminHome />}
            />
            <Route
                path="/admin/coach/:coachId"
                element={<CoachDetail />}
            />
            <Route
                path="/admin/coach-class/:coachId"
                element={<CoachClass />}
            />
            <Route
                path="/admin/coach"
                element={<AdminCoach />}
            />
        </Routes>
    );
};

export default App;
