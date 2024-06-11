// hooks
import React from 'react';
import { useState } from 'react';
// images
import galloping_purple_logo from 'assets/logo/galloping_purple_logo.jpg';
// icons
import { CgClose } from 'react-icons/cg';

interface ReadFeedbackModalType {
    modalBtn: React.ReactNode;
}

const ReadFeedbackModal = ({ modalBtn }: ReadFeedbackModalType) => {
    const [isShow, setIsShow] = useState(false);
    const handleShowModal = () => {
        setIsShow(true);
        document.body.style.overflow = 'hidden';
    };
    const handleCloseModal = () => {
        setIsShow(false);
        document.body.style.overflow = 'unset';
    };
    const feedbackInfo = [
        {
            date: '2024-03-07',
            content: '왼발 자세 보완 필요',
        },
        { date: '2024-03-07', content: '왼발 자세 보완 필요' },
        {
            date: '2024-03-05',
            content:
                '이번 게임에서 순발력이 다소 떨어지는 부분이 보였음. 순간적으로 빠른 힘과 상대에게서 빠르게 반응하기 위한 속도감은 체력이 뒷바탕이 되어야 함. 저강도 에너지를 끌어올리는 유산소와 고강도 에너지를 쓰는 무산소 지구력의 밸런스를 맞춰 훈련 및 체력 키워오기',
        },
        {
            date: '2024-03-04',
            content:
                '드리블 시 뮤게중심이 한쪽으로 너무 치우쳐져 있음. 다음 레슨때까지 밸런스를 맞춰 드리블 연습 및 보완해오기',
        },
        { date: '2024-03-07', content: '왼발 자세 보완 필요' },
        { date: '2024-03-07', content: '왼발 자세 보완 필요' },
        { date: '2024-03-07', content: '왼발 자세 보완 필요' },
        { date: '2024-03-05', content: '드리블 훌륭' },
        { date: '2024-03-04', content: '드리블 매우 훌륭' },
    ];

    return (
        <div>
            <div onClick={handleShowModal}>{modalBtn}</div>
            {isShow ? (
                <div className="fixed flex justify-center items-center top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] border border-red-100 z-[60]">
                    <div className="fixed bg-egWhite-default z-[70] w-[30rem] p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-3 font-bold">
                            <div>나의 피드백</div>
                            <CgClose onClick={handleCloseModal} />
                        </div>
                        <div className="overflow-y-auto h-96">
                            {feedbackInfo.map((el, idx) => (
                                <div
                                    key={idx}
                                    className="px-3 py-2 mb-3 mr-4 rounded-md bg-egGrey-semiLight"
                                >
                                    <div className="flex justify-between items-top">
                                        <div className="flex items-center mb-3">
                                            <img
                                                src={galloping_purple_logo}
                                                alt="galloping_purple_logo"
                                                className="w-5 h-5 mr-2 rounded-full"
                                            />
                                            <div className="text-sm">피드백</div>
                                        </div>
                                        <div className="text-xs">{el.date}</div>
                                    </div>
                                    <div className="text-sm">{el.content}</div>
                                </div>
                            ))}
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
export default ReadFeedbackModal;
