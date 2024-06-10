// hooks
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
// api
import { requestGet, requestPost, requestDelete } from 'api/basic';
// recoil
import { useRecoilValue } from 'recoil';
import { IsMobileSelector } from 'atom/isMobile';
// Buttons
import WhiteBtn from 'components/Buttons/WhiteBtn';
import PurpleBtn from 'components/Buttons/PurpleBtn';
// icons
import { CgClose } from 'react-icons/cg';
import { MdDelete } from 'react-icons/md';
import { MdEdit } from 'react-icons/md';

interface skillType {
    _id: string;
    name: string;
    category: string;
}

interface AbilityEditModalType {
    tagEditState: boolean;
    setTagEditState: (data: boolean) => void;
}

const AbilityEditModal = ({ tagEditState, setTagEditState }: AbilityEditModalType) => {
    let isMobile = useRecoilValue(IsMobileSelector);

    const [isShow, setIsShow] = useState(false);
    const [searchedData, setSearchedData] = useState([]);
    const [technicalSkill, setTechnicalSkill] = useState<skillType[]>([]);
    const [mentalSkill, setMentalSkill] = useState<skillType[]>([]);
    const [physicalSkill, setPhysicalSkill] = useState<skillType[]>([]);

    const [technicalTagInput, setTechnicalTagInput] = useState('');
    const [mentalTagInput, setMentalTagInput] = useState('');
    const [physicalTagInput, setPhysicalTagInput] = useState('');

    const handleShowModal = () => {
        setIsShow(true);
        document.body.style.overflow = 'hidden';
    };
    const handleCloseModal = () => {
        setIsShow(false);
        document.body.style.overflow = 'unset';
    };

    // GET 요청을 보낼 함수 정의
    const { data, error, isLoading, refetch } = useQuery({
        queryKey: ['getEditAbility'],
        queryFn: () => {
            return requestGet({
                requestUrl: `/ability`,
                successFunc: setSearchedData,
                // flagCheckFunc: setIsSearched,
            });
        },
        staleTime: 5 * 1000,
    });

    // POST 요청을 보낼 함수 정의
    const mutation = useMutation({
        mutationFn: ({ requestUrl, data, flagCheckFunc }: any) => {
            return requestPost({
                requestUrl: requestUrl,
                data: data,
                flagCheckFunc: flagCheckFunc,
            });
        },
    });
    const postAbility = (category: string, name: string) => {
        mutation.mutate({
            requestUrl: '/ability',
            data: {
                category: category,
                name: name,
            },
            flagCheckFunc: setTagEditState,
        });
        setTechnicalTagInput('');
        setMentalTagInput('');
        setPhysicalTagInput('');
    };

    useEffect(() => {
        if (searchedData) {
            searchedData.forEach((data: any) => {
                switch (data.category) {
                    case 'mental':
                        setMentalSkill(data.ability);
                        break;
                    case 'physical':
                        setPhysicalSkill(data.ability);

                        break;
                    case 'technical':
                        setTechnicalSkill(data.ability);
                        break;
                    default:
                        break;
                }
            });
        }
    }, [searchedData]);

    // DELETE 요청을 보낼 함수 정의
    const deleteMutation = useMutation({
        mutationFn: ({ requestUrl, flagCheckFunc }: any) => {
            return requestDelete({
                requestUrl: requestUrl,
                flagCheckFunc: flagCheckFunc,
            });
        },
    });
    const deleteAbility = (tagId: string) => {
        deleteMutation.mutate({
            requestUrl: `/ability/${tagId}`,
            flagCheckFunc: setTagEditState,
        });
    };

    useEffect(() => {
        if (tagEditState) {
            refetch();
            setTagEditState(false);
        }
    }, [tagEditState]);

    return (
        <div>
            <button
                type="button"
                onClick={handleShowModal}
                className="flex items-center px-2 py-1 text-sm border border-egPurple-default text-egPurple-default bg-egPurple-superLight"
            >
                <span className="mr-1">태그 수정</span>
                <MdEdit />
            </button>
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
                            <span className="text-lg font-bold">태그 수정</span>

                            <CgClose onClick={handleCloseModal} />
                        </div>
                        <div className="overflow-y-scroll h-72">
                            <div className="p-2 mt-6 border bg-egGrey-light">
                                <div className="mt-1 mb-2 font-semiBold">기술적 능력</div>
                                <div className="flex w-full mb-2">
                                    <input
                                        type="text"
                                        maxLength={20}
                                        value={technicalTagInput}
                                        onChange={(e) => setTechnicalTagInput(e.target.value)}
                                        className="w-full p-1 border rounded-md border-egPurple-default"
                                    />
                                    <button
                                        onClick={() => postAbility('technical', technicalTagInput)}
                                        className="px-2 ml-1 border rounded-md w-14 bg-egPurple-superLight border-egPurple-default text-egPurple-default"
                                    >
                                        추가
                                    </button>
                                </div>
                                <div>
                                    {technicalSkill.map((el, idx) => (
                                        <button
                                            key={idx}
                                            className="inline-block px-1 py-1 m-1 border rounded-md w-fit bg-egBlack-superLight"
                                        >
                                            {el.name}
                                            <CgClose
                                                className="inline mb-1"
                                                onClick={() => deleteAbility(el._id)}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="p-2 mt-6 border bg-egGrey-light">
                                <div className="mt-1 mb-2 font-semiBold">정신적 능력</div>
                                <div className="flex w-full mb-2">
                                    <input
                                        type="text"
                                        maxLength={20}
                                        value={mentalTagInput}
                                        onChange={(e) => setMentalTagInput(e.target.value)}
                                        className="w-full p-1 border rounded-md border-egPurple-default"
                                    />
                                    <button
                                        onClick={() => postAbility('mental', mentalTagInput)}
                                        className="px-2 ml-1 border rounded-md w-14 bg-egPurple-superLight border-egPurple-default text-egPurple-default"
                                    >
                                        추가
                                    </button>
                                </div>
                                <div>
                                    {mentalSkill.map((el, idx) => (
                                        <button
                                            key={idx}
                                            className="inline-block px-1 py-1 m-1 border rounded-md w-fit bg-egBlack-superLight"
                                        >
                                            {el.name}
                                            <CgClose
                                                className="inline mb-1"
                                                onClick={() => deleteAbility(el._id)}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="p-2 mt-6 border bg-egGrey-light">
                                <div className="mt-1 mb-2 font-semiBold">신체적 능력</div>
                                <div className="flex w-full mb-2">
                                    <input
                                        type="text"
                                        maxLength={20}
                                        value={physicalTagInput}
                                        onChange={(e) => setPhysicalTagInput(e.target.value)}
                                        className="w-full p-1 border rounded-md border-egPurple-default"
                                    />
                                    <button
                                        onClick={() => postAbility('physical', physicalTagInput)}
                                        className="px-2 ml-1 border rounded-md w-14 bg-egPurple-superLight border-egPurple-default text-egPurple-default"
                                    >
                                        추가
                                    </button>
                                </div>
                                <div>
                                    {physicalSkill.map((el, idx) => (
                                        <button
                                            key={idx}
                                            className="inline-block px-1 py-1 m-1 border rounded-md w-fit bg-egBlack-superLight"
                                        >
                                            {el.name}
                                            <CgClose
                                                className="inline mb-1"
                                                onClick={() => deleteAbility(el._id)}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end text-sm">
                            <div>
                                <WhiteBtn
                                    content={'닫기'}
                                    func={handleCloseModal}
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

export default AbilityEditModal;
