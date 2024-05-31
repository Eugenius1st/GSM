// hooks
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
// api
import { requestGet } from 'api/basic';
// Buttons
import WhiteBtn from 'components/Buttons/WhiteBtn';
import PurpleBtn from 'components/Buttons/PurpleBtn';
// icons
import { CgClose } from 'react-icons/cg';
import { IoMdSearch } from 'react-icons/io';
// Card
import EmptyCard from 'components/Cards/EmptyCard';
// Pagination
import PaginationRounded from 'components/EgMaterials/Pagenation';

interface UserAddModalType {
    modalBtn: React.ReactNode;
    modalTitle?: string;
    modalContents?: string | React.ReactNode;
    modalFooterExitBtn?: string;
    modalFooterActiveBtn?: string;
    modalScrollStayFlag?: boolean;
    modalActiveFunc?: (data: any) => void;
}

export interface UserDataType {
    name: string;
    photo?: string;
    _id: string;
    classGroupName?: string;
}

const UserAddModal = ({
    modalBtn,
    modalTitle,
    modalContents,
    modalFooterExitBtn,
    modalFooterActiveBtn,
    modalActiveFunc,
    modalScrollStayFlag = true,
}: UserAddModalType) => {
    const [isShow, setIsShow] = useState(false);
    const [queryEnabled, setQueryEnabled] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [isSearched, setIsSearched] = useState(false);
    const [searchedData, setSearchedData] = useState([]);
    const [totalItems, setTotalItems] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [curPage, setCurPage] = useState(1);
    const handleShowModal = () => {
        setIsShow(true);
        // document.body.style.overflow = 'hidden';
    };
    const handleCloseModal = () => {
        setIsShow(false);
        // if (modalScrollStayFlag) document.body.style.overflow = 'unset';
    };
    // GET 요청을 보낼 함수 정의
    const { data, error, isLoading, refetch } = useQuery({
        queryKey: ['searchUser'],
        queryFn: () => {
            if (searchInput) {
                return requestGet({
                    requestUrl: `/student/search/${searchInput}?with_head=true&take=${itemsPerPage}&page=${curPage}`,
                    // successFunc: setSearchedData,
                    flagCheckFunc: setIsSearched,
                });
            } else {
                // searchInput이 undefined일 때에 대한 처리
                return Promise.resolve([]); // 또는 다른 유효한 값을 반환할 수 있음
            }
        },
        staleTime: 5 * 1000,
        enabled: queryEnabled, // enabled 옵션을 사용하여 쿼리를 활성화 또는 비활성화합니다.
    });
    useEffect(() => {
        if (data) {
            setSearchedData(data.result);
            setTotalItems(data.count);
        }
    }, [data]);
    const handleButtonClick = () => {
        // GET 요청 버튼 클릭 시에만 쿼리를 활성화하도록 설정합니다.
        if (searchInput) {
            setQueryEnabled(true);
            refetch();
        }
    };

    const handleActive = (data: UserDataType) => {
        if (modalActiveFunc && isSearched) {
            modalActiveFunc(data);
            handleCloseModal();
        }
    };

    return (
        <div className="z-10">
            <div onClick={handleShowModal}>{modalBtn}</div>
            {isShow ? (
                <div className="fixed flex justify-center items-center top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] border border-red-100 z-[60]">
                    <div className="fixed bg-egWhite-default z-[70] w-full max-w-[30rem] p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                            <div className="mb-2 text-xl font-bold">{modalTitle}</div>
                            <CgClose onClick={handleCloseModal} />
                        </div>
                        <div className="p-2">
                            <div>{modalContents}</div>
                            <div className="flex items-center w-full mt-4 border border-egPurple-default">
                                <input
                                    type="text"
                                    minLength={20}
                                    className="w-full p-2 border-none focus:outline-none"
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                />
                                <IoMdSearch
                                    onClick={handleButtonClick}
                                    className="w-6 h-6 mx-2 text-egPurple-default"
                                />
                            </div>
                            {searchedData && searchedData.length > 0 ? (
                                <div className="h-40 py-1 overflow-y-auto ">
                                    {searchedData.map((el: UserDataType, idx) => (
                                        <div
                                            onClick={() => handleActive(el)}
                                            key={idx}
                                            className="flex justify-between px-4 py-2 hover:bg-egPurple-superLight"
                                        >
                                            <img
                                                src={el.photo}
                                                alt={el.name}
                                                className="w-8 h-8 rounded-full"
                                            />
                                            <div>{el.name}</div>
                                            <div>{el.classGroupName}</div>
                                        </div>
                                    ))}
                                    {searchedData && searchedData.length > 0 && (
                                        <div className="flex justify-center mt-4">
                                            <PaginationRounded
                                                totalItems={totalItems}
                                                itemsPerPage={itemsPerPage}
                                                curPage={curPage}
                                                setCurPage={setCurPage}
                                                // onPageChange={() => }
                                            />
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <EmptyCard
                                    content={'검색 결과가 없습니다'}
                                    customStyle="flex flex-col items-center justify-center py-10 my-5 text-egPurple-semiLight"
                                />
                            )}
                        </div>
                        <div className="flex justify-end">
                            {modalFooterExitBtn && (
                                <WhiteBtn
                                    content={modalFooterExitBtn}
                                    func={handleCloseModal}
                                />
                            )}
                            {modalFooterActiveBtn && (
                                <div>
                                    <PurpleBtn content={modalFooterActiveBtn} />
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

export default UserAddModal;
