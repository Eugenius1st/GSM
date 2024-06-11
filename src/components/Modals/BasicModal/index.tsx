// hooks
import { useState } from 'react';
// Buttons
import WhiteBtn from 'components/Buttons/WhiteBtn';
import PurpleBtn from 'components/Buttons/PurpleBtn';
// icons
import { CgClose } from 'react-icons/cg';

interface BasicModalType {
    modalBtn: React.ReactNode;
    modalTitle?: React.ReactNode | string;
    modalContents?: React.ReactNode | string;
    modalFooterExitBtn?: string;
    modalFooterActiveBtn?: string;
    modalFooterActiveFunc?: () => void;
    modalFooterActiveFuncAfterClose?: boolean;
    modalScrollStayFlag?: boolean;
}

const BasicModal = ({
    modalBtn,
    modalTitle,
    modalContents,
    modalFooterExitBtn,
    modalFooterActiveBtn,
    modalFooterActiveFunc,
    modalFooterActiveFuncAfterClose = false,
    modalScrollStayFlag = true,
}: BasicModalType) => {
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
            <div onClick={handleShowModal}>{modalBtn}</div>
            {isShow ? (
                <div className="fixed flex justify-center items-center top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] border border-red-100 z-[60]">
                    <div className="fixed bg-egWhite-default z-[70] w-[30rem] p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                            <div className="mb-2 text-xl font-bold">{modalTitle}</div>
                            <CgClose onClick={handleCloseModal} />
                        </div>
                        <div>{modalContents}</div>
                        <div className="flex justify-end">
                            {modalFooterExitBtn && (
                                <WhiteBtn
                                    content={modalFooterExitBtn}
                                    func={handleCloseModal}
                                />
                            )}
                            {modalFooterActiveBtn && (
                                <div onClick={() => modalFooterActiveFuncAfterClose && handleCloseModal()}>
                                    <PurpleBtn
                                        content={modalFooterActiveBtn}
                                        func={modalFooterActiveFunc}
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

export default BasicModal;
