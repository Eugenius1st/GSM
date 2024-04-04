// Buttons
import PurpleBtn from 'components/Buttons/PurpleBtn';
// hooks
import { useState } from 'react';
// Cards
import MemoCard from 'components/Cards/MemoCard';
// Buttons
import WhiteBtn from 'components/Buttons/WhiteBtn';
// icons
import { CgClose } from 'react-icons/cg';

const ClassAddModal = () => {
    const [isShow, setIsShow] = useState(false);
    const handleShowModal = () => {
        setIsShow(true);
        document.body.style.overflow = 'hidden';
    };
    const handleCloseModal = () => {
        setIsShow(false);
        document.body.style.overflow = 'unset';
    };
    return (
        <div>
            <WhiteBtn
                content="+ 수업 추가"
                func={handleShowModal}
            />

            {isShow ? (
                <div className="fixed flex justify-center items-center top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] border border-red-100 z-[60]">
                    <div className="fixed bg-egWhite-default z-[70] w-[30rem] p-4 rounded-lg">
                        <div className="flex justify-between">
                            <div className="mb-2 text-lg font-bold">수업 추가하기</div>
                            <CgClose onClick={handleCloseModal} />
                        </div>
                        <div className="p-4">
                            <div className="flex mb-2">
                                <span className="w-20 mr-4 text-lg font-semibold">수업명</span>
                                <input
                                    placeholder="수업명"
                                    type="number"
                                    min="0"
                                    max="99"
                                    className="w-40 p-1 border rounded-md border-egGrey-default"
                                />
                            </div>
                            <div className="flex mb-2">
                                <span className="w-20 mr-4 text-lg font-semibold">날짜</span>
                                <input
                                    type="date"
                                    className="w-40 p-1 border rounded-md border-egGrey-default"
                                />
                            </div>

                            <div className="flex mb-2 items">
                                <span className="w-20 mr-4 text-lg font-semibold">위치</span>
                                <div className="flex items-center mr-2">
                                    <input
                                        type="radio"
                                        id="pangyo"
                                        name="location"
                                        value="pangyo"
                                        className="w-4 h-4 mr-1"
                                        defaultChecked={true}
                                    />
                                    <label htmlFor="pangyo">판교점</label>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id="Suwon"
                                        name="location"
                                        value="Suwon"
                                        className="w-4 h-4 mr-1"
                                    />
                                    <label htmlFor="Suwon">수원점</label>
                                </div>
                            </div>
                            <div className="flex mb-2">
                                <span className="w-20 mr-4 text-lg font-semibold">인원 제한</span>
                                <input
                                    placeholder="숫자입력"
                                    type="number"
                                    min="0"
                                    max="99"
                                    className="w-40 p-1 border rounded-md border-egGrey-default"
                                />
                            </div>
                            <div className="flex mb-2">
                                <span className="w-20 mr-4 text-lg font-semibold">참석 코치</span>

                                <input
                                    placeholder="코치 이름"
                                    type="number"
                                    min="0"
                                    max="99"
                                    className="w-40 p-1 border rounded-md border-egGrey-default"
                                />
                            </div>
                            <div className="flex mb-2">
                                <span className="w-20 mr-4 text-lg font-semibold">안내 사항</span>
                                <textarea
                                    name="opinion"
                                    cols={30}
                                    rows={4}
                                    maxLength={100}
                                    placeholder="안내사항은 100글자 내로 작성하세요"
                                    className="p-1 border rounded-md border-egGrey-default"
                                ></textarea>
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
export default ClassAddModal;
