// layouts
import AdminHome from 'layouts/Admin/Home';
import AdminCoach from 'layouts/Admin/Coach';
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
                path="/admin/coach-management"
                element={<AdminCoach />}
            />
        </Routes>
    );
};

export default App;
