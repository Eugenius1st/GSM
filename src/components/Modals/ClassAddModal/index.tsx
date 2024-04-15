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
import { FiPlus } from 'react-icons/fi';
import { IoMdSearch } from 'react-icons/io';
// Modals
import BasicModal from '../BasicModal';

const ClassAddModal = () => {
    const classList = ['엘리트반', '성인반', '취미반'];
    const [selectedClass, setSelecteClass] = useState('');
    const [isShow, setIsShow] = useState(false);
    const [isSearched, setIsSearched] = useState(false);
    const searchedCoachs = [
        { id: 1, name: '손상훈', birth: '1997' },
        { id: 1, name: '손삼훈', birth: '1997' },
        { id: 1, name: '송상흥', birth: '1997' },
        { id: 1, name: '손상훈', birth: '1997' },
        { id: 1, name: '손삼훈', birth: '1997' },
        { id: 1, name: '송상흥', birth: '1997' },
        { id: 1, name: '손상훈', birth: '1997' },
        { id: 1, name: '손삼훈', birth: '1997' },
        { id: 1, name: '송상흥', birth: '1997' },
    ];
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
                            <div className="flex items-center mb-2">
                                <label
                                    htmlFor="className"
                                    className="w-20 mr-4 text-lg font-semibold"
                                >
                                    수업명
                                </label>
                                <select
                                    name="className"
                                    id="className"
                                    className="w-32 p-1 border rounded-md border-egGrey-default"
                                    onChange={(e) => setSelecteClass(e.target.value)}
                                >
                                    {classList.map((el, idx) => (
                                        <option
                                            key={idx}
                                            value={el}
                                        >
                                            {el}
                                        </option>
                                    ))}
                                </select>
                                <BasicModal
                                    modalBtn={
                                        <button className="flex items-center p-1 ml-2 border rounded-md border-egPurple-default hover:bg-egPurple-superLight">
                                            <div className="text-sm">수업 추가</div>
                                            <FiPlus className="w-4 h-4 text-egPurple-default " />
                                            <div></div>
                                        </button>
                                    }
                                    modalTitle={'수업 추가'}
                                    modalContents={
                                        <div className="p-2">
                                            <div>추가하실 수업명을 입력하세요 (최대 15글자)</div>
                                            <input
                                                placeholder="수업명"
                                                maxLength={15}
                                                type="text"
                                                className="w-full p-2 my-4 border border-egPurple-default"
                                            />
                                        </div>
                                    }
                                    modalFooterExitBtn={'취소'}
                                    modalFooterActiveBtn={'입력'}
                                    modalScrollStayFlag={false}
                                />
                            </div>
                            {selectedClass === '엘리트반' && (
                                <div className="flex mb-2 items">
                                    <span className="w-20 mr-4 text-lg font-semibold">수업분류</span>

                                    <div className="flex items-center mr-2">
                                        <input
                                            type="radio"
                                            id="skills"
                                            name="classification"
                                            value="skills"
                                            className="w-4 h-4 mr-1"
                                        />
                                        <label htmlFor="skills">실기 수업</label>
                                    </div>
                                    <div className="flex items-center mr-2">
                                        <input
                                            type="radio"
                                            id="theory"
                                            name="classification"
                                            value="theory"
                                            className="w-4 h-4 mr-1"
                                            defaultChecked={true}
                                        />
                                        <label htmlFor="theory">이론 수업</label>
                                    </div>
                                </div>
                            )}
                            <div className="flex mb-2">
                                <span className="w-20 mr-4 text-lg font-semibold">시작 날짜</span>
                                <input
                                    type="date"
                                    className="w-32 p-1 mr-2 border rounded-md border-egGrey-default"
                                />
                                <input
                                    type="time"
                                    className="w-32 p-1 border rounded-md border-egGrey-default"
                                />
                            </div>
                            <div className="flex mb-2">
                                <span className="w-20 mr-4 text-lg font-semibold">종료 날짜</span>
                                <input
                                    type="date"
                                    className="w-32 p-1 mr-2 border rounded-md border-egGrey-default"
                                />
                                <input
                                    type="time"
                                    className="w-32 p-1 border rounded-md border-egGrey-default"
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
                                    <label htmlFor="Suwon">수원월드컵점</label>
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
                            <div className="flex items-center mb-2">
                                <span className="w-20 mr-4 text-lg font-semibold">참석 코치</span>
                                <div className="w-40 h-8 p-1 border rounded-md border-egGrey-default">
                                    <div className="flex items-center px-1 text-sm rounded-sm bg-egBlack-superLight w-fit">
                                        손상훈 <CgClose />
                                    </div>
                                </div>
                                <BasicModal
                                    modalBtn={
                                        <button className="flex items-center p-1 ml-2 border rounded-md border-egPurple-default hover:bg-egPurple-superLight">
                                            <div className="mr-1 text-sm">코치 검색</div>
                                            <IoMdSearch className="w-4 h-4 text-egPurple-default" />
                                        </button>
                                    }
                                    modalTitle={'코치 검색'}
                                    modalContents={
                                        <div className="p-2">
                                            <div>찾으시는 코치의 이름을 입력하세요 (최대 10글자)</div>
                                            <div className="flex items-center w-full mt-4 border border-egPurple-default">
                                                <input
                                                    type="text"
                                                    minLength={10}
                                                    className="w-full p-2 border-none focus:outline-none"
                                                />
                                                <IoMdSearch
                                                    onClick={() => setIsSearched(!isSearched)}
                                                    className="w-6 h-6 mx-2 text-egPurple-default"
                                                />
                                            </div>
                                            {isSearched && (
                                                <div className="h-40 py-1 overflow-y-auto border shadow-lg rounded-b-md">
                                                    {searchedCoachs.map((el) => (
                                                        <div className="flex px-4 py-1 hover:bg-egGrey-light">
                                                            {el.name} ({el.birth})
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    }
                                    // modalFooterExitBtn={'취소'}
                                    // modalFooterActiveBtn={'입력'}
                                    modalScrollStayFlag={false}
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
