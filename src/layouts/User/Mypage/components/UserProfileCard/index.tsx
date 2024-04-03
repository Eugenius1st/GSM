import { useState, useEffect } from 'react';
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
    console.log(position);
    return (
        // <div className="fixed w-[15rem] p-4 border h-full border-egGrey-default">
        <div
            className={
                position > 77 && !isMobile
                    ? 'fixed w-[15.15rem] p-4 border border-egGrey-default mt-[-5.5rem]'
                    : 'p-4 border h-72 border-egGrey-default'
            }
        >
            <div className="">
                <img
                    src={thumbnail}
                    alt="coach_son"
                    className="object-cover p-1 m-auto mt-1 border rounded-full h-28 min-w-28 border-egPurple-default"
                />
                <div className="flex flex-col justify-center w-full mt-8 rounded-md">
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
                </div>
            </div>
        </div>
    );
};

export default UserProfileCard;
