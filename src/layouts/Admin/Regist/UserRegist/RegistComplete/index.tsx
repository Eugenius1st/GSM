// icons
import { FiUserCheck } from 'react-icons/fi';

const RegistComplete = () => {
    return (
        <div className="eg-regist-wrapper">
            <div className="my-16 text-center text-egPurple-default">
                <FiUserCheck className="w-20 h-20 p-4 m-auto " />
                <div className="mt-10">가입이 완료되었습니다.</div>
            </div>
        </div>
    );
};

export default RegistComplete;
