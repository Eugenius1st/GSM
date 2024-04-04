// hooks
import { useState, useEffect } from 'react';
// icons
import { FaRegMessage } from 'react-icons/fa6';
// Modals
import ReadFeedbackModal from 'components/Modals/ReadFeedbackModal';
interface UserProfileCardType {
    isMobile: boolean;
    thumbnail: string;
    name: string;
    birth: string;
    classInfo: any;
}

const UserProfileCard = ({ isMobile, thumbnail, name, birth, classInfo }: UserProfileCardType) => {
    const infoStyle = 'mb-2 pb-1 flex border-b border-egGrey-default';
    const titleStyle = isMobile ? 'mr-2 w-2/5 ' : 'mr-2 w-1/3 ';
    const highLight = 'px-1 bg-egPurple-superLight';

    const [position, setPosition] = useState(0);
    function onScroll() {
        setPosition(window.scrollY);
    }
    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, []);
    return (
        <div className={'border border-egGrey-default'}>
            <div className={isMobile ? 'flex flex-col items-center justify-center' : 'flex items-center'}>
                <img
                    src={thumbnail}
                    alt="coach_son"
                    className="object-cover h-40 p-1 m-8 border rounded-full min-w-40 border-egPurple-default"
                />
                <div className="flex flex-col justify-center w-full p-8 rounded-md">
                    <div className={infoStyle}>
                        <div className={titleStyle}>
                            <span className={highLight}>이름</span>
                        </div>
                        <div>{name}</div>
                    </div>
                    <div className={infoStyle}>
                        <div className={titleStyle}>
                            <span className={highLight}>생년월일</span>
                        </div>
                        <div>{birth}</div>
                    </div>
                    <div className={infoStyle}>
                        <div className={titleStyle}>
                            <span className={highLight}>잔여회차</span>
                        </div>

                        <div>
                            {classInfo.remainingRounds} / {classInfo.paymentRound}
                        </div>
                    </div>

                    <ReadFeedbackModal
                        modalBtn={
                            <button className="flex items-center justify-center w-full py-2 mt-2 rounded-md text-egPurple-default bg-egGrey-semiLight">
                                <FaRegMessage className="mr-3" />내 피드백 보기
                            </button>
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default UserProfileCard;
