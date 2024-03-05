import coach_son from 'assets/coach/coach_son.jpeg';
const ProfileCard = () => {
    return (
        <div className="flex items-center">
            <img
                src={coach_son}
                alt="coach_son"
                className="rounded-full w-28 h-28"
            />
            <ul className="ml-4">
                <li>
                    <span>기본정보1</span>
                    <span>기본정보에 대한 설명</span>
                </li>
                <li>
                    <span>기본정보1</span>
                    <span>기본정보에 대한 설명</span>
                </li>
                <li>
                    <span>기본정보1</span>
                    <span>기본정보에 대한 설명</span>
                </li>
                <li>
                    <span>기본정보1</span>
                    <span>기본정보에 대한 설명</span>
                </li>
            </ul>
        </div>
    );
};

export default ProfileCard;
