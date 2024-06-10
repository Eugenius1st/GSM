// hooks
import { useState } from 'react';
// recoil
import { useRecoilValue } from 'recoil';
import { IsMobileSelector } from 'atom/isMobile';
// Buttons
import WhiteBtn from 'components/Buttons/WhiteBtn';
import PurpleBtn from 'components/Buttons/PurpleBtn';
// icons
import { CgClose } from 'react-icons/cg';

interface LastRoundInfoModalType {
    modalFooterActiveFunc?: () => void;
    modalFooterActiveFuncAfterClose?: boolean;
    modalScrollStayFlag?: boolean;
}

const LastRoundInfoModal = ({ modalScrollStayFlag = true }: LastRoundInfoModalType) => {
    let isMobile = useRecoilValue(IsMobileSelector);
    const [isShow, setIsShow] = useState(false);
    const handleShowModal = () => {
        setIsShow(true);
        document.body.style.overflow = 'hidden';
    };
    const handleCloseModal = () => {
        setIsShow(false);
        if (modalScrollStayFlag) document.body.style.overflow = 'unset';
    };
    return (
        <div>
            <div onClick={handleShowModal}>이전 수강 내역 보기</div>
            {isShow ? (
                <div className="fixed flex justify-center items-center top-0 left-0 w-screen h-screen  z-[60]">
                    <div
                        className={
                            isMobile
                                ? 'fixed bg-egWhite-default z-[70] w-full max-w-[30rem] p-4 border border-egGrey-default'
                                : 'fixed bg-egWhite-default z-[70] w-[30rem] p-4 border border-egGrey-default'
                        }
                    >
                        <div className="flex items-center justify-between">
                            <div className="mb-2 text-xl font-bold">이전 수강 내역</div>
                            <CgClose onClick={handleCloseModal} />
                        </div>
                        <div></div>
                        <div className="flex justify-end">
                            <WhiteBtn
                                content={'취소'}
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

export default LastRoundInfoModal;
