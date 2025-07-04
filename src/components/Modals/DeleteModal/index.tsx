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
import { MdDelete } from 'react-icons/md';
interface DeleteModalType {
    deleteFunc?: () => void;
}
const DeleteModal = ({ deleteFunc }: DeleteModalType) => {
    let isMobile = useRecoilValue(IsMobileSelector);
    const [isShow, setIsShow] = useState(false);
    const handleShowModal = () => {
        setIsShow(true);
        document.body.style.overflow = 'hidden';
    };
    const handleCloseModal = () => {
        document.body.style.overflow = 'unset';
        alert('삭제되었습니다.');
        setIsShow(false);
    };
    const [deleteInput, setDeleteInput] = useState('');
    function handleInitial() {
        document.body.style.overflow = 'unset';
        setDeleteInput('');
        if (deleteFunc) {
            deleteFunc();
        }

        setIsShow(false);
    }

    return (
        <div>
            <div
                onClick={handleShowModal}
                className="flex items-center ml-2"
            >
                <span className="text-sm">삭제</span>
                <MdDelete className="w-5 h-5 text-egPurple-default" />
            </div>
            {isShow ? (
                <div className="fixed flex justify-center items-center top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] border border-red-100 z-[60]">
                    <div
                        className={
                            isMobile
                                ? 'fixed bg-egWhite-default z-[70] w-full max-w-[30rem] p-4 rounded-lg'
                                : 'fixed bg-egWhite-default z-[70] w-[30rem] p-4 rounded-lg'
                        }
                    >
                        <div className="flex items-center justify-end">
                            <CgClose onClick={handleCloseModal} />
                        </div>
                        <div className="my-4">
                            <div className="mb-2 font-bold">삭제 하시겠습니까?</div>
                            <div className="mb-4 text-base text-egBlack-semiLight">[ 삭제하기 ] 를 입력하세요</div>
                            <input
                                onChange={(e) => setDeleteInput(e.target.value)}
                                value={deleteInput}
                                placeholder="삭제하기"
                                className="w-full p-2 mb-4 text-base border rounded-md border-egPurple-semiLight"
                            />
                        </div>
                        <div className="flex justify-end text-base font-normal">
                            <WhiteBtn
                                content={'취소'}
                                func={handleCloseModal}
                            />

                            <div className="font-normal">
                                <PurpleBtn
                                    content={'삭제'}
                                    func={() => deleteInput === '삭제하기' && handleInitial()}
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

export default DeleteModal;
