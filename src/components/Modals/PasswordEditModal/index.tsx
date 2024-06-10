// hooks
import React from 'react';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
// api
import { requestPatch } from 'api/basic';
// Buttons
import WhiteBtn from 'components/Buttons/WhiteBtn';
import PurpleBtn from 'components/Buttons/PurpleBtn';
// icons
import { CgClose } from 'react-icons/cg';
import { IoIosLock } from 'react-icons/io';

interface PasswordEditModalType {
    modalBtn?: React.ReactNode;
    activeFunc?: () => void;
}

interface PatchDataType {
    requestUrl: string;
    data?: any;
    successFunc?: (data: any) => void;
}

const PasswordEditModal = ({ activeFunc, modalBtn }: PasswordEditModalType) => {
    const [isShow, setIsShow] = useState(false);
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [newPw, setNewPw] = useState('');
    const [patchState, setPatchState] = useState<any>('');
    const [requestClick, setRequestClick] = useState(false);
    const handleShowModal = () => {
        setIsShow(true);
        document.body.style.overflow = 'hidden';
    };
    const handleCloseModal = () => {
        setIsShow(false);
        document.body.style.overflow = 'unset';
    };

    // Patch 요청
    const mutation = useMutation({
        mutationFn: ({ requestUrl, data, successFunc }: PatchDataType) => {
            return requestPatch({
                requestUrl: requestUrl,
                data: data,
                successFunc: successFunc,
            });
        },
    });
    function handleEditPassword() {
        // password 정규식
        setRequestClick(true);
        const pwRegex = /^[a-zA-Z0-9!@#$%^&*()\-_=+{};:,<.>?]{8,20}$/;
        if (!pwRegex.test(pw) || !pwRegex.test(newPw)) {
            alert('Password는 8~20자의 영문 대소문자, 숫자, 특수문자로 이루어져야 합니다.');
            setRequestClick(false);
        } else {
            mutation.mutate({
                requestUrl: `/auth/password`,
                data: {
                    id: id,
                    password: pw,
                    newPassword: newPw,
                },
                successFunc: setPatchState,
            });
        }
    }

    useEffect(() => {
        if (patchState && requestClick) {
            alert('비밀번호가 변경되었습니다');
            setId('');
            setPw('');
            setNewPw('');
            handleCloseModal();
            setPatchState('');
            setRequestClick(false);
        } else if (requestClick) {
            alert('없는 계정이거나, 잘못된 비밀번호 입니다.');
            setRequestClick(false);
        }
    }, [patchState, requestClick]);
    return (
        <div>
            <button
                type="button"
                className={modalBtn ? 'w-full' : 'w-fit'}
                onClick={handleShowModal}
            >
                {modalBtn ? (
                    modalBtn
                ) : (
                    <div className="flex items-center ml-2">
                        <span className="text-sm">PW변경</span>
                        <IoIosLock className="w-5 h-5 text-egPurple-default" />
                    </div>
                )}
            </button>
            {isShow ? (
                <div className="fixed flex justify-center items-center top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] border border-red-100 z-[60]">
                    <div className="fixed bg-egWhite-default z-[70] w-full max-w-[30rem] p-4 rounded-lg">
                        <div className="flex items-center justify-end">
                            <CgClose onClick={handleCloseModal} />
                        </div>
                        <div className="my-4 text-base font-bold text-center">비밀번호 변경</div>
                        <div className="flex flex-col">
                            <div className="flex items-center text-sm font-semibold text-egBlack-semiLight">ID</div>

                            <input
                                type="text"
                                placeholder="idx"
                                className="w-full p-2 my-1 border rounded-md border-egGrey-default"
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                            />
                            <div className="flex items-center mt-4 text-sm font-semibold text-egBlack-semiLight">
                                기존 비밀번호
                            </div>
                            <input
                                type="password"
                                placeholder="password"
                                className="w-full p-2 my-1 border rounded-md border-egGrey-default"
                                value={pw}
                                onChange={(e) => setPw(e.target.value)}
                            />
                            <div className="flex items-center mt-4 text-sm font-semibold text-egBlack-semiLight">
                                새로운 비밀번호
                            </div>
                            <input
                                type="password"
                                placeholder="new password"
                                className="w-full p-2 my-1 border rounded-md border-egGrey-default"
                                value={newPw}
                                onChange={(e) => setNewPw(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-end mt-4 text-sm">
                            <WhiteBtn
                                content={'취소'}
                                func={handleCloseModal}
                            />

                            <div>
                                <PurpleBtn
                                    content={'변경'}
                                    func={handleEditPassword}
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

export default PasswordEditModal;
