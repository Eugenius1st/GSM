// hooks
import { useNavigate } from 'react-router-dom';
// icons
import { FiUserCheck } from 'react-icons/fi';
// buttons
import PurpleBtn from 'components/Buttons/PurpleBtn';
const RegistComplete = () => {
    const navigate = useNavigate();
    return (
        <div className="eg-regist-wrapper">
            <div className="my-16 text-center text-egPurple-default">
                <FiUserCheck className="w-20 h-20 p-4 m-auto " />
                <div className="mt-10">가입이 완료되었습니다.</div>
            </div>
            <PurpleBtn
                content={'완료'}
                func={() => navigate('/admin')}
                width="full"
            />
        </div>
    );
};

export default RegistComplete;
