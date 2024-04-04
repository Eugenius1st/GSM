// hooks
import * as React from 'react';
import { useState } from 'react';
// Buttons
import PurpleBtn from 'components/Buttons/PurpleBtn';
import WhiteBtn from 'components/Buttons/WhiteBtn';
// icons
import { CgClose } from 'react-icons/cg';

const AlarmModal = () => {
    // 버튼 오류 해결 필요하다 !!
    const alramInfo = [
        { title: '입금 안내', message: '갤로핑싸커 이용을 원하시면 입금 부탁드립니다.' },
        { title: '준비물 안내', message: '금주 폭염 주의보로, 차가운 물 준비하세요.' },
        { title: '차감 안내', message: '엘리트반 N 회차 등록으로, 회차가 차감되었습니다.' },
        { title: '만료 안내', message: '입금 만료가 임박했으므로, 갤로핑싸커 이용을 원하시면 입금 부탁드립니다.' },
    ];
    const tabList = ['입금 안내', '준비물 안내', '차감 안내', '만료 안내'];
    const [tab, setTab] = useState(tabList[0]);
    const [isShow, setIsShow] = useState(false);
    const handleShowModal = () => {
        setIsShow(true);
        document.body.style.overflow = 'hidden';
    };
    const handleCloseModal = () => {
        setIsShow(false);
        document.body.style.overflow = 'unset';
    };
    const activeTab = 'text-egWhite-default bg-egPurple-default font-base';
    const inactiveTab = 'text-egPurple-default bg-egGrey-semiLight font-base hover:bg-egPurple-light';
    return (
        <div onClick={(e) => e.stopPropagation()}>
            <WhiteBtn
                content="알림 전송"
                func={handleShowModal}
            />
            {isShow ? (
                <div className="fixed flex justify-center items-center top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] border border-red-100 z-[60]">
                    <div className="fixed bg-egWhite-default z-[70] w-[30rem] p-4 rounded-lg">
                        <div className="flex justify-between mx-2 mb-4">
                            <div className="mb-2 text-xl font-bold">알림 메세지 전송</div>
                            <CgClose onClick={handleCloseModal} />
                        </div>
                        <div className="flex justify-start mb-2">
                            {tabList.map((el, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => setTab(el)}
                                    className={`px-4 py-2 ml-2 rounded-md ${tab === el ? activeTab : inactiveTab}`}
                                >
                                    {el}
                                </div>
                            ))}
                        </div>
                        <div>
                            {alramInfo.map(
                                (el, idx) =>
                                    el.title === tab && (
                                        <textarea
                                            key={idx}
                                            name="opinion"
                                            cols={40}
                                            rows={4}
                                            maxLength={30}
                                            value={el.message}
                                            readOnly
                                            placeholder="사유는 30글자 내로 작성하세요"
                                            className="w-11/12 p-2 my-4 text-lg border rounded-md bg-egPurple-superLight border-egPurple-default"
                                        ></textarea>
                                    )
                            )}
                        </div>
                        <div className="flex justify-end mt-4">
                            <WhiteBtn
                                content="취소"
                                func={handleCloseModal}
                            />
                            <PurpleBtn
                                content="보내기"
                                func={handleCloseModal}
                            />
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
export default AlarmModal;
