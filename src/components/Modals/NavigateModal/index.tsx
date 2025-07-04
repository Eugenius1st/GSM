// hooks
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// recoil
import { useRecoilValue } from 'recoil';
import { IsMobileSelector } from 'atom/isMobile';

// Buttons
import WhiteBtn from 'components/Buttons/WhiteBtn';
import PurpleBtn from 'components/Buttons/PurpleBtn';
// icons
import { CgClose } from 'react-icons/cg';

interface NavigateModalType {
    modalBtn: React.ReactNode;
    modalTitle?: string;
    modalContents?: React.ReactNode;
    modalFooterExitBtn?: string;
    modalFooterActiveBtn?: string;
    modalScrollStayFlag?: boolean;
    isSuccess: boolean;
    navigateUrl?: string;
}

const NavigateModal = ({
    modalBtn,
    modalTitle,
    modalContents,
    modalFooterExitBtn,
    modalFooterActiveBtn,
    modalScrollStayFlag = true,
    isSuccess = false,
    navigateUrl,
}: NavigateModalType) => {
    let isMobile = useRecoilValue(IsMobileSelector);
    const navigate = useNavigate();
    const [isShow, setIsShow] = useState(isSuccess);
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
            <div onClick={handleShowModal}>{modalBtn}</div>
            {isShow ? (
                <div className="fixed flex justify-center items-center top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] border border-red-100 z-[60]">
                    <div
                        className={
                            isMobile
                                ? 'fixed bg-egWhite-default z-[70] w-full max-w-[30rem] p-4 rounded-lg'
                                : 'fixed bg-egWhite-default z-[70] w-[30rem] p-4 rounded-lg'
                        }
                    >
                        <div className="flex items-center justify-between">
                            <div className="mb-2 text-xl font-bold">{modalTitle}</div>
                            <CgClose onClick={handleCloseModal} />
                        </div>
                        <div className="my-8 text-lg font-semibold text-center">{modalContents}</div>
                        <div className="flex justify-end">
                            {modalFooterExitBtn && (
                                <WhiteBtn
                                    content={modalFooterExitBtn}
                                    func={handleCloseModal}
                                />
                            )}
                            {modalFooterActiveBtn && (
                                <div>
                                    <PurpleBtn
                                        content={modalFooterActiveBtn}
                                        func={() => navigateUrl && navigate(navigateUrl)}
                                    />
                                </div>
                            )}
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

export default NavigateModal;
