// hooks
import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
// api
import { requestPost } from 'api/basic';
// Buttons
import WhiteBtn from 'components/Buttons/WhiteBtn';
import PurpleBtn from 'components/Buttons/PurpleBtn';
// icons
import { CgClose } from 'react-icons/cg';

interface RoundProductAddModalType {
    flag: boolean;
    setFlag: (flag: boolean) => void;
}

const RoundProductAddModal = ({ flag, setFlag }: RoundProductAddModalType) => {
    const [isShow, setIsShow] = useState(false);
    const [newRPName, setNewRPName] = useState('');
    const [newRPPrice, setNewRPPrice] = useState<number>(0);
    const [newRPCount, setNewRPCount] = useState<number>(0);
    const [newRPStartDate, setNewRPStartDate] = useState('');
    const [newRPEndDate, setNewRPEndDate] = useState<string>('');
    const [alertPoint, setAlertPoint] = useState<number>(0);

    // POST 요청
    const addRoundProduct = useMutation({
        mutationFn: ({ requestUrl, data, flagCheckFunc }: any) => {
            return requestPost({
                requestUrl: requestUrl,
                data: data,
                flagCheckFunc: flagCheckFunc,
            });
        },
    });
    const handleAddRoundProduct = () => {
        if (!newRPName && !newRPCount && !newRPCount && !newRPStartDate) {
            alert('필수항목을 입력하세요');
        } else {
            addRoundProduct.mutate({
                requestUrl: '/roundproduct',
                data: {
                    name: newRPName,
                    price: newRPCount,
                    roundCount: newRPCount,
                    startOfSales: newRPStartDate,
                    endOfSales: newRPEndDate ? newRPEndDate : null,
                },
                flagCheckFunc: setFlag,
            });
        }
    };
    useEffect(() => {
        if (flag) {
            setNewRPName('');
            setNewRPCount(0);
            setNewRPPrice(0);
            setNewRPStartDate('');
            setNewRPEndDate('');
            handleCloseModal();
        }
    }, [flag]);

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
            <div onClick={handleShowModal}>
                <button className="px-2 py-1 font-bold border border-egGrey-default text-egPurple-default hover:bg-egPurple-semiLight hover:text-egWhite-default">
                    상품+
                </button>
            </div>
            {isShow ? (
                <div className="fixed flex justify-center items-center top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] border border-red-100 z-[60]">
                    <div className="fixed bg-egWhite-default z-[70] w-[30rem] p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                            <div className="mb-2 text-xl font-bold">회차 상품 추가</div>
                            <CgClose onClick={handleCloseModal} />
                        </div>
                        <div className="p-2">
                            <div className="flex items-center my-2">
                                <div className="font-semibold w-28">상품명 *</div>
                                <input
                                    placeholder="상품명"
                                    type="text"
                                    value={newRPName}
                                    onChange={(e) => setNewRPName(e.target.value)}
                                    className="w-full p-1 border rounded-sm border-egGrey-default"
                                />
                            </div>

                            <div className="flex items-center my-2">
                                <div className="w-1/2 font-semibold">가격 *</div>
                                <input
                                    type="number"
                                    value={newRPPrice}
                                    onChange={(e) => setNewRPPrice(Number(e.target.value))}
                                    className="w-full p-1 border rounded-sm border-egGrey-default"
                                />
                            </div>

                            <div className="flex items-center my-2">
                                <div className="w-1/2 font-semibold">총회차 *</div>
                                <input
                                    type="number"
                                    value={newRPCount}
                                    onChange={(e) => setNewRPCount(Number(e.target.value))}
                                    className="w-full p-1 border rounded-sm border-egGrey-default"
                                />
                            </div>

                            <div className="flex items-center my-2">
                                <div className="w-1/2 font-semibold">가격 알림 제공 회차*</div>
                                <input
                                    type="number"
                                    value={alertPoint}
                                    min={0}
                                    max={newRPCount}
                                    onChange={(e) => setAlertPoint(Number(e.target.value))}
                                    className="w-full p-1 border rounded-sm border-egGrey-default"
                                />
                            </div>

                            <div className="flex items-center my-2">
                                <div className="font-semibold w-28">시작 날짜 *</div>
                                <input
                                    type="datetime-local"
                                    value={newRPStartDate}
                                    onChange={(e) => setNewRPStartDate(e.target.value)}
                                    className="w-full p-1 border rounded-sm border-egGrey-default"
                                />
                            </div>
                            <div className="flex items-center my-2">
                                <div className="font-semibold w-28">종료 날짜</div>
                                <input
                                    type="datetime-local"
                                    value={newRPEndDate}
                                    onChange={(e) => setNewRPEndDate(e.target.value)}
                                    className="w-full p-1 border rounded-sm border-egGrey-default"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <WhiteBtn
                                content={'취소'}
                                func={handleCloseModal}
                            />
                            <div>
                                <PurpleBtn
                                    content={'추가'}
                                    func={handleAddRoundProduct}
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

export default RoundProductAddModal;
