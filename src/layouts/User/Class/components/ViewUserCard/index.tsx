// colors
import colors from 'assets/colors/palette';
// Buttons
import GreyBorderBtn from 'components/Buttons/GreyBorderBtn';
// Cards
import EmptyCard from 'components/Cards/EmptyCard';

interface AttendUserType {
    _id: string;
    name: string;
    birth: string;
    studentId: string;
    photo: string;
    status: string;
}
interface AttendInfoType {
    attendInfo: AttendUserType[];
}
const UserViewUserCard = ({ attendInfo = [] }: AttendInfoType) => {
    const userMemo = {
        feedback: [
            { date: '2024-03-07', content: '3골 넣음' },
            { date: '2024-03-07', content: '패스 실력 향상됨' },
            { date: '2024-03-07', content: '드리블 훈련 살짝 미흡함. 다듬어야함' },
            { date: '2024-03-07', content: '에잇 라운드 훈련 미숙함' },
            { date: '2024-03-05', content: '에잇 라운드 훈련 미숙함' },
            { date: '2024-03-04', content: '에잇 라운드 훈련 미숙함' },
        ],
        significant: [
            {
                date: '2024-03-07',
                content:
                    '태도가 아주 좋음 태도가 아주 좋음 태도가 아주 좋음 태도가 아주 좋음 태도가 아주 좋음 태도가 아주 좋음',
            },
            { date: '2024-03-07', content: '태도가 아주 좋음' },
            { date: '2024-03-07', content: '태도가 아주 좋음' },
            { date: '2024-03-07', content: '태도가 아주 좋음' },
            { date: '2024-03-05', content: '인사성 밝음' },
            { date: '2024-03-04', content: '아이들 이름 외울 필요 있음' },
        ],
    };
    console.log(attendInfo);
    return (
        <div className="px-2">
            {attendInfo.length > 0 ? (
                <>
                    {attendInfo.map((el, idx) => (
                        <div
                            key={idx}
                            className="flex items-center p-2 "
                        >
                            <div>
                                <img
                                    src={el.photo}
                                    className="object-cover w-12 h-12 mr-4 rounded-full"
                                />
                            </div>
                            <div className="flex w-full">
                                <div className="ml-16 ">{el.name}</div>
                                <div className="ml-16 text-egGrey-default">{el.birth}00 년생</div>
                            </div>
                        </div>
                    ))}
                    {attendInfo.length > 5 && (
                        <div className="flex justify-center mt-5">
                            <GreyBorderBtn content="더보기" />
                        </div>
                    )}
                </>
            ) : (
                <EmptyCard
                    content="아직 인원이 없습니다"
                    customStyle="flex flex-col items-center justify-center py-20 my-5 text-egPurple-semiLight"
                />
            )}
        </div>
    );
};

export default UserViewUserCard;
