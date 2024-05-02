// hooks
import { useState } from 'react';
// Buttons
import WhiteBtn from 'components/Buttons/WhiteBtn';
import PurpleBtn from 'components/Buttons/PurpleBtn';
// icons
import { CgClose } from 'react-icons/cg';
import { MdDelete } from 'react-icons/md';
import { MdEdit } from 'react-icons/md';
interface EditModalType {
    activeFunc?: () => void;
}

const EditModal = ({ activeFunc }: EditModalType) => {
    const [isShow, setIsShow] = useState(false);
    const handleShowModal = () => {
        setIsShow(true);
        document.body.style.overflow = 'hidden';
    };
    const handleCloseModal = () => {
        setIsShow(false);
        document.body.style.overflow = 'unset';
    };
    const handleActive = () => {
        if (activeFunc) activeFunc();
        handleCloseModal();
    };
    return (
        <div>
            <button
                type="button"
                onClick={handleShowModal}
                className="flex items-center ml-2"
            >
                <span className="text-sm">수정</span>
                <MdEdit className="w-5 h-5 text-egPurple-default" />
            </button>
            {isShow ? (
                <div className="fixed flex justify-center items-center top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] border border-red-100 z-[60]">
                    <div className="fixed bg-egWhite-default z-[70] w-[30rem] p-4 rounded-lg">
                        <div className="flex items-center justify-end">
                            <CgClose onClick={handleCloseModal} />
                        </div>
                        <div className="my-8 text-base font-bold text-center">수정 하시겠습니까?</div>
                        <div className="flex justify-end text-sm">
                            <WhiteBtn
                                content={'취소'}
                                func={handleCloseModal}
                            />

                            <div>
                                <PurpleBtn
                                    content={'수정'}
                                    func={handleActive}
                                />
                            </div>
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

export default EditModal;
