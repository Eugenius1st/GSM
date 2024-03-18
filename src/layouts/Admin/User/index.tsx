// Coach Component
import UserTable from 'layouts/Admin/User/Components/UserTable';

const User = () => {
    return (
        <div className="mb-2 eg-admin-wrapper">
            <div className="eg-title">회원관리</div>
            <UserTable />
        </div>
    );
};

export default User;
