// Common
import Divider from 'components/Common/Divider';
interface recordType {
    date: number;
    title: string;
}

interface CoachInfoType {
    thumbnail: string;
    name: string;
    birth: string;
    gender: string;
    duty: boolean;
    license: string[];
    record: recordType[];
}

interface InfoType {
    coachInfo: CoachInfoType;
}

const CoachProfileCard = ({ coachInfo }: InfoType) => {
    const titleStyle = 'mr-2 font-bold my-1';
    return (
        <div>
            <div className="flex items-center ">
                <img
                    src={coachInfo.thumbnail}
                    alt="coach_son"
                    className="object-cover h-40 mr-4 rounded-full min-w-40"
                />
                <ul>
                    <li>
                        <span className={titleStyle}>코치이름:</span>
                        <span>{coachInfo.name}</span>
                    </li>
                    <li>
                        <span className={titleStyle}>생년월일:</span>
                        <span>{coachInfo.birth}</span>
                    </li>
                    <li>
                        <span className={titleStyle}>성별:</span>
                        <span>{coachInfo.gender === 'man' ? '남자' : '여자'}</span>
                    </li>
                    <li>
                        <span className={titleStyle}>군필여부:</span>
                        <span>{coachInfo.duty ? '있음' : '없음'}</span>
                    </li>
                    <li>
                        <span className={titleStyle}>자격증:</span>
                        <span>{coachInfo.license.join(', ')}</span>
                    </li>
                </ul>
            </div>
            <Divider />
            <div className="px-4">
                <div className="mb-2 text-lg font-bold">이력</div>
                <div>
                    {coachInfo.record.map((el, idx) => (
                        <div
                            key={idx}
                            className="px-2 my-2 bg-egPurple-superLight"
                        >
                            <span className="mr-4">{el.date}</span>
                            <span className="font-bold">{el.title}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CoachProfileCard;
