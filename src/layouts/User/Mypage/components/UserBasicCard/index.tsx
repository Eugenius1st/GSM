interface UserBasicCardType {
    isMobile: boolean;
    gender: string;
    phone: string;
    parentsPhone: string;
    address: string;
    detailAddress?: string;
}
const UserBasicCard = ({ isMobile, gender, phone, parentsPhone, address, detailAddress }: UserBasicCardType) => {
    const infoStyle = 'mb-2 pb-1 flex border-b border-egGrey-default';
    const titleStyle = isMobile ? 'mr-2 w-2/5 ' : 'mr-2 w-1/4 ';
    const highLight = 'px-1 bg-egPurple-superLight';

    return (
        <div className="w-full px-4 border h-72 border-egGrey-default">
            <div className="eg-title">기본정보</div>
            <div className="flex flex-col justify-center w-full mt-12 rounded-md">
                <div className={infoStyle}>
                    <div className={titleStyle}>
                        <span className={highLight}>성별</span>
                    </div>
                    <div>{gender}</div>
                </div>
                <div className={infoStyle}>
                    <div className={titleStyle}>
                        <span className={highLight}>연락처</span>
                    </div>
                    <div>{phone}</div>
                </div>
                <div className={infoStyle}>
                    <div className={titleStyle}>
                        <span className={highLight}>부모 연락처</span>
                    </div>

                    <div>{parentsPhone}</div>
                </div>
                <div className={infoStyle}>
                    <div className={titleStyle}>
                        <span className={highLight}>주소</span>
                    </div>

                    <div>{address}</div>
                </div>
                <div className={infoStyle}>
                    <div className={titleStyle}></div>

                    <div>{detailAddress}</div>
                </div>
            </div>
        </div>
    );
};

export default UserBasicCard;
