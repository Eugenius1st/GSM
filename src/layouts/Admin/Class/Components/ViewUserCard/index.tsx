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
                        {/* <MemoModal
                            tab={['피드백', '특이사항']}
                            memo={userMemo}
                        /> */}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CoachViewUserCard;
