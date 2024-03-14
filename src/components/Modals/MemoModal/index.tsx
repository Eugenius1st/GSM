// Buttons
import PurpleBtn from 'components/Buttons/PurpleBtn';
// hooks
import { useState } from 'react';
// Cards
import MemoCard from 'components/Cards/MemoCard';
// type
import type { MemoCardType } from 'components/Cards/MemoCard';
// icons
import { CgClose } from 'react-icons/cg';

const MemoModal = ({ tab = ['피드백', '특이사항'], memo }: MemoCardType) => {
    const [isShow, setIsShow] = useState(false);
    return (
        <div>
            <PurpleBtn
                content="메모"
                func={() => setIsShow(true)}
            />
            {isShow ? (
                <div className="fixed flex justify-center items-center top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] border border-red-100 z-[60]">
                    <div className="fixed bg-egWhite-default z-[70] w-[30rem] p-4 rounded-lg">
                        <div className="flex justify-end">
                            <CgClose onClick={() => setIsShow(false)} />
                        </div>
                        <MemoCard
                            tab={tab}
                            memo={memo}
                        />
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
export default MemoModal;
