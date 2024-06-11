// hooks
import { useEffect, useState } from 'react';
// recoil
import { useRecoilValue } from 'recoil';
import { IsMobileSelector } from 'atom/isMobile';
// Buttons
import WhiteBtn from 'components/Buttons/WhiteBtn';
import PurpleBtn from 'components/Buttons/PurpleBtn';
// icons
import { CgClose } from 'react-icons/cg';
import { FaMousePointer } from 'react-icons/fa';
// utility
import { ARMatcherByEng } from 'utility/standardConst';

interface RoundInfoType {
    _id: string;
    studentId: string;
    roundProductId: string;
    available: boolean;
    use: string;
    useStartAt?: string | null;
    expires?: string | null;
    roundAR: any[];
    nRoundAr: number;
    roundProductName: string;
    lessonType: string;
    roundAmount: number;
    rest: number;
}

interface LastRoundInfoModalType {
    groupRounds: RoundInfoType[];
    personalRounds: RoundInfoType[];
}

const LastRoundInfoModal = ({ groupRounds, personalRounds }: LastRoundInfoModalType) => {
    let isMobile = useRecoilValue(IsMobileSelector);
    const [isShow, setIsShow] = useState(false);
    const [tab, setTab] = useState('단체');
    const tdStyle = 'border border-egBlack-light p-1';
    const trStyle = 'border border-egBlack-light bg-egGrey-light font-bold';

    const handleShowModal = () => {
        setIsShow(true);
    };
    const handleCloseModal = () => {
        setIsShow(false);
    };

    const [groupTableInfo, setGroupTableInfo] = useState<any>([]);
    const PastClassesTable = (tab: string) => {
        const tableRowData = tab === '단체' ? groupRounds : personalRounds;
        const pastClasses = tableRowData.flatMap((product) =>
            product.roundAR.map((classInfo) => ({
                ...classInfo,
                roundProductName: product.roundProductName,
                lessonType: product.lessonType,
            }))
        );
        setGroupTableInfo(pastClasses);
    };

    useEffect(() => {
        PastClassesTable(tab);
    }, [tab, groupRounds, personalRounds]);

    return (
        <div>
            <button
                type="button"
                className="flex items-center px-1 border text-egGrey-default border-egGrey-default hover:bg-egPurple-superLight"
                onClick={handleShowModal}
            >
                전체 내역 조회
                <FaMousePointer className="w-3 h-3 ml-1" />
            </button>
            {isShow ? (
                <div className="fixed flex justify-center items-center top-0 left-0 w-screen h-screen  z-[60]">
                    <div
                        className={
                            isMobile
                                ? 'fixed bg-egWhite-default z-[70] w-full max-w-[30rem] p-4 border border-egGrey-default'
                                : 'fixed bg-egWhite-default z-[70] my-4 h-[80%] p-4 border border-egGrey-default'
                        }
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="mb-2 text-lg font-semibold">이전 수강 내역</div>
                            <CgClose onClick={handleCloseModal} />
                        </div>
                        <div className="font-bold">
                            <button
                                onClick={() => setTab('단체')}
                                className={
                                    tab === '단체'
                                        ? 'text-egPurple-default border px-2 border-egPurple-default'
                                        : ' px-2'
                                }
                            >
                                단체
                            </button>
                            <button
                                onClick={() => setTab('개인')}
                                className={
                                    tab === '개인'
                                        ? 'text-egPurple-default border px-2 border-egPurple-default'
                                        : 'px-2'
                                }
                            >
                                개인
                            </button>
                        </div>

                        {/* 태이블 컨텐츠 */}
                        <div className="h-[85%] overflow-scroll">
                            {groupTableInfo.length > 0 ? (
                                <table className="mt-4 ">
                                    <thead>
                                        <tr>
                                            <th className={trStyle}>수업명</th>
                                            <th className={trStyle}>상태</th>
                                            <th className={trStyle}>시작일</th>
                                            <th className={trStyle}>종료일</th>
                                            <th className={trStyle}>상품명</th>
                                            {/* <th className={trStyle}>구분</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {groupTableInfo.map((classInfo: any) => (
                                            <tr key={classInfo._id}>
                                                <td className={tdStyle}>{classInfo.className}</td>
                                                <td className={tdStyle}>{ARMatcherByEng(classInfo.status)}</td>
                                                <td className={tdStyle}>
                                                    {new Date(classInfo.startTime).toLocaleString()}
                                                </td>
                                                <td className={tdStyle}>
                                                    {new Date(classInfo.endTime).toLocaleString()}
                                                </td>
                                                <td className={tdStyle}>{classInfo.roundProductName}</td>
                                                {/* <td className={tdStyle}>{classInfo.lessonType}</td> */}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="w-[30rem] flex justify-center items-center h-[85%]">
                                    수강 내역이 없습니다.
                                </div>
                            )}
                        </div>
                        <div className="flex justify-center">
                            <button
                                onClick={handleCloseModal}
                                className="px-3 py-1 mt-2 border hover:bg-egGrey-semiLight border-egGrey-default"
                            >
                                닫기
                            </button>
                        </div>
                    </div>
                    <button
                        onClick={handleCloseModal}
                        className="absolute top-0 z-0 w-screen h-screen"
                    ></button>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default LastRoundInfoModal;
