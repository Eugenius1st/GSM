// hooks
import { useState } from 'react';
// Buttons
import WhiteBtn from 'components/Buttons/WhiteBtn';
import PurpleBtn from 'components/Buttons/PurpleBtn';
// icons
import { CgClose } from 'react-icons/cg';

interface BasicModalType {
    ModalBtn: React.ReactNode;
    ModalTitle?: string;
    ModalContents?: React.ReactNode;
    ModalFooterExitBtn?: string;
    ModalFooterActiveBtn?: string;
}

const BasicModal = ({
    ModalBtn,
    ModalTitle,
    ModalContents,
    ModalFooterExitBtn,
    ModalFooterActiveBtn,
}: BasicModalType) => {
    const [isShow, setIsShow] = useState(false);
    return (
        <div>
            <div onClick={() => setIsShow(true)}>{ModalBtn}</div>
            {isShow ? (
                <div className="fixed flex justify-center items-center top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] border border-red-100 z-[60]">
                    <div className="fixed bg-egWhite-default z-[70] w-[30rem] p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                            <div className="mb-2 text-xl font-bold">{ModalTitle}</div>
                            <CgClose onClick={() => setIsShow(false)} />
                        </div>
                        <div>{ModalContents}</div>
                        <div className="flex justify-end">
                            {ModalFooterExitBtn && (
                                <div onClick={() => setIsShow(false)}>
                                    <WhiteBtn content={ModalFooterExitBtn} />
                                </div>
                            )}
                            {ModalFooterActiveBtn && (
                                <div>
                                    <PurpleBtn content={ModalFooterActiveBtn} />
                                </div>
                            )}
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

export default BasicModal;
