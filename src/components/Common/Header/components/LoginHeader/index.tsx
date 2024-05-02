//hooks
import { Link, useNavigate } from 'react-router-dom';
// recoil
import { useRecoilValue } from 'recoil';
import { LoginStateSelector } from 'atom/auth';
// Buttons
import PurpleBtn from 'components/Buttons/PurpleBtn';
// images
import galloping_purple_logo from 'assets/logo/galloping_purple_logo.jpg';

const LoginHeader = () => {
    const loginState = useRecoilValue(LoginStateSelector);
    const navigate = useNavigate();

    return (
        <div className="fixed top-0 z-50 w-screen border-b-2 bg-egWhite-default">
            <div className="flex items-center justify-between max-w-screen-xl p-2 m-auto ">
                <Link to="/admin">
                    <div className="flex items-center">
                        <img
                            src={galloping_purple_logo}
                            alt="galloping_purple_logo"
                            className="inline w-10 h-10 mr-2 rounded-full"
                        />
                        <h1 className="text-lg font-bold text-egPurple-default">GSM</h1>
                    </div>
                </Link>

                <div>
                    <PurpleBtn
                        content="Login"
                        func={() => navigate('/')}
                    />
                </div>
            </div>
        </div>
    );
};

export default LoginHeader;
