// Buttons
import PurpleBtn from 'components/Buttons/PurpleBtn';
import WhiteBtn from 'components/Buttons/WhiteBtn';
// Modals
import MemoModal from 'components/Modals/MemoModal';
// Eg Components
import DropDown from 'components/EgMaterials/DropDown';
// colors
import colors from 'assets/colors/palette';

interface AttendUserType {
    profile: string;
    name: string;
    age: number;
    attend?: string;
}
interface AttendInfoType {
    attendInfo: AttendUserType[];
}
const CoachViewUserCard = ({ attendInfo }: AttendInfoType) => {
    const { egPurple, egWhite, egRed, egYellow, egGreen, egBlack } = colors;
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
    return (
        <div className="z-0 px-2">
            {attendInfo.map((el, idx) => (
                <div
                    key={idx}
                    className="flex items-center justify-between mb-3"
                >
                    <img
                        src={el.profile}
                        className="w-12 h-12 mr-4 rounded-full"
                    />
                    <div className="mr-4">
                        {el.name} / {el.age} 세
                    </div>
                    <div className="flex items-center justify-end ">
                        <DropDown
                            itemList={[
                                { item: '참석', bgColor: egWhite.default },
                                { item: '불참', bgColor: egRed.semiLihgt },
                                { item: '지각', bgColor: egYellow.semiLight },
                                { item: '취소', bgColor: egBlack.superLight },
                            ]}
                        />
                        <MemoModal
                            tab={['피드백', '특이사항']}
                            memo={userMemo}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CoachViewUserCard;
