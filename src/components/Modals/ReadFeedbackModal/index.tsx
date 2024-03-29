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
    const feedbackInfo = [
        {
            date: '2024-03-07',
            content: '왼발 자세 보완 필요',
        },
        { date: '2024-03-07', content: '왼발 자세 보완 필요' },
        { date: '2024-03-05', content: '드리블 훌륭' },
        { date: '2024-03-04', content: '드리블 매우 훌륭' },
        { date: '2024-03-07', content: '왼발 자세 보완 필요' },
        { date: '2024-03-07', content: '왼발 자세 보완 필요' },
        { date: '2024-03-07', content: '왼발 자세 보완 필요' },
        { date: '2024-03-05', content: '드리블 훌륭' },
        { date: '2024-03-04', content: '드리블 매우 훌륭' },
    ];
    return (
        <div>
            <div onClick={() => setIsShow(true)}>{modalBtn}</div>
            {isShow ? (
                <div className="fixed flex justify-center items-center top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] border border-red-100 z-[60]">
                    <div className="fixed bg-egWhite-default z-[70] w-[30rem] p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-3 font-bold">
                            <div>나의 피드백</div>
                            <CgClose onClick={() => setIsShow(false)} />
                        </div>
                        <div className="overflow-y-auto h-96">
                            {feedbackInfo.map((el) => (
                                <div className="px-2 py-1 mb-2 rounded-md bg-egGrey-light">
                                    <div className="flex items-center justify-between">
                                        <div className="flex mb-1">
                                            <img
                                                src={galloping_purple_logo}
                                                alt="galloping_purple_logo"
                                                className="w-6 h-6 mr-2 rounded-full"
                                            />
                                            <div className="font-bold">피드백</div>
                                        </div>
                                        <div className="text-xs text-end">{el.date}</div>
                                    </div>
                                    <div>{el.content}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={() => setIsShow(false)}
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
