// Common
import Divider from 'components/Common/Divider';
// Cardsimport
import EmptyCard from 'components/Cards/EmptyCard';
// images
<<<<<<< HEAD
import userImg from 'assets/user/user.png';
=======
import userTempPhoto from 'assets/user/userTempPhoto.png';
>>>>>>> db0f4f6e0046e862aa782edc570772134d108ef4

interface recordType {
    date: number;
    title: string;
}

interface CoachInfoType {
    photo?: string;
    name: string;
    birth: string;
    gender: string;
    duty: boolean;
    license: string[];
    record: recordType[];
    createdAt?: string;
    lv: number;
    mobile: string;
}

interface InfoType {
    coachInfo: CoachInfoType | undefined;
<<<<<<< HEAD
}

const CoachProfileCard = ({ coachInfo }: InfoType) => {
=======
    coachPhoto?: string;
}

const CoachProfileCard = ({ coachPhoto, coachInfo }: InfoType) => {
>>>>>>> db0f4f6e0046e862aa782edc570772134d108ef4
    const listStyle = 'flex items-center border-b border-egGrey-default mt-1';
    const titleStyle = 'mr-2 font-bold px-1 my-1 w-28';
    const highLight = 'px-1 bg-egPurple-superLight';
    return (
        <div>
            {coachInfo && (
                <div>
                    <div className={'w-full m-auto border border-egGrey-default p-4'}>
                        <img
<<<<<<< HEAD
                            src={coachInfo.photo === 'any-photo-url' ? userImg : coachInfo.photo}
=======
                            src={coachPhoto ? coachPhoto : userTempPhoto}
>>>>>>> db0f4f6e0046e862aa782edc570772134d108ef4
                            alt="coach_son"
                            className="object-cover w-32 h-32 p-1 m-auto mb-4 border rounded-full border-egPurple-default"
                        />
                        <ul>
                            <li className={listStyle}>
                                <div className={titleStyle}>
                                    <span className={highLight}>코치이름</span>
                                </div>
                                <div>{coachInfo.name}</div>
                            </li>
                            {coachInfo.lv && (
                                <li className={listStyle}>
                                    <div className={titleStyle}>
                                        <span className={highLight}>LV</span>
                                    </div>
                                    <div>{coachInfo.lv}</div>
                                </li>
                            )}
                            {coachInfo.birth && (
                                <li className={listStyle}>
                                    <div className={titleStyle}>
                                        <span className={highLight}>생년월일</span>
                                    </div>
                                    <div>{coachInfo.birth.slice(0, 10)}</div>
                                </li>
                            )}
                            {coachInfo.mobile && (
                                <li className={listStyle}>
                                    <div className={titleStyle}>
                                        <span className={highLight}>휴대폰</span>
                                    </div>
                                    <div>{coachInfo.mobile}</div>
                                </li>
                            )}
                            <li className={listStyle}>
                                <div className={titleStyle}>
                                    <span className={highLight}>성별</span>
                                </div>

                                <span>{coachInfo.gender === 'male' ? '남자' : '여자'}</span>
                            </li>
                            <li className={listStyle}>
                                <div className={titleStyle}>
                                    <span className={highLight}>군필여부</span>
                                </div>

                                <span>{coachInfo.duty}</span>
                            </li>
                            {coachInfo.license && coachInfo.license.length > 0 ? (
                                <li className={listStyle}>
                                    <div className={titleStyle}>
                                        <span className={highLight}>자격증</span>
                                    </div>

                                    <span>{coachInfo.license.join(', ')}</span>
                                </li>
                            ) : (
                                <li className={listStyle}>
                                    <div className={titleStyle}>
                                        <span className={highLight}>자격증</span>
                                    </div>

                                    <span>등록 없음</span>
                                </li>
                            )}
                        </ul>
                    </div>
                    {/* <div className="px-4">
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
                    </div> */}
                </div>
            )}
        </div>
    );
};

export default CoachProfileCard;
