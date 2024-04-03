interface UserAdditionalCardType {
    isMobile: boolean;
    height: number;
    weight: number;
    team: string;
    soccerSkills: string;
    lessonExperience?: string;
    position: string;
    mainFoot: string;
}
const UserAdditionalCard = ({
    isMobile,
    height,
    weight,
    team,
    soccerSkills,
    lessonExperience,
    position,
    mainFoot,
}: UserAdditionalCardType) => {
    const infoStyle = 'mb-2 pb-1 flex border-b border-egGrey-default';
    const titleStyle = isMobile ? 'mr-2 w-2/5 ' : 'mr-2 w-1/3 ';
    const highLight = 'px-1 bg-egPurple-superLight';

    return (
        <div className="w-full px-4 border border-egGrey-default">
            <div className="eg-title">추가정보</div>
            <div className="flex flex-col justify-center w-full mt-8 rounded-md">
                <div className={infoStyle}>
                    <div className={titleStyle}>
                        <span className={highLight}>키</span>
                    </div>
                    <div>{height} cm</div>
                </div>
                <div className={infoStyle}>
                    <div className={titleStyle}>
                        <span className={highLight}>몸무게</span>
                    </div>
                    <div>{weight} kg</div>
                </div>
                <div className={infoStyle}>
                    <div className={titleStyle}>
                        <span className={highLight}>소속팀</span>
                    </div>

                    <div>{team}</div>
                </div>
                <div className={infoStyle}>
                    <div className={titleStyle}>
                        <span className={highLight}>축구 구력</span>
                    </div>

                    <div>{soccerSkills}</div>
                </div>
                <div className={infoStyle}>
                    <div className={titleStyle}>
                        <span className={highLight}>레슨 경험</span>
                    </div>
                    <div>{lessonExperience}</div>
                </div>
                <div className={infoStyle}>
                    <div className={titleStyle}>
                        <span className={highLight}>포지션</span>
                    </div>
                    <div>{position}</div>
                </div>
                <div className={infoStyle}>
                    <div className={titleStyle}>
                        <span className={highLight}>주 발</span>
                    </div>
                    <div>{mainFoot}</div>
                </div>
            </div>
        </div>
    );
};

export default UserAdditionalCard;
