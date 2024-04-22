// hooks
import { useState } from 'react';
// Buttons
import WhiteBtn from 'components/Buttons/WhiteBtn';
import PurpleBtn from 'components/Buttons/PurpleBtn';
// icons
import { CgClose } from 'react-icons/cg';

interface BasicAlertType {
    alertTitle?: string;
    alertContents?: React.ReactNode | string;
    alertFooterActiveBtn?: string;
    alertFooterActiveFunc?: () => void;
}

function BasicAlert({ alertTitle, alertContents, alertFooterActiveBtn, alertFooterActiveFunc }: BasicAlertType) {
    const handleAlertFooterActiveFunc = () => {
        if (alertFooterActiveFunc) {
            alertFooterActiveFunc();
        }
    };
    return (
        <div>
            <div className="fixed flex justify-center items-center z-[80] top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] border border-red-100 ">
                <div className="fixed bg-egWhite-default  w-[30rem] p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                        <div className="mb-2 text-xl font-bold">{alertTitle}</div>
                        <CgClose onClick={handleAlertFooterActiveFunc} />
                    </div>
                    <div className="pt-10 pb-5 text-center">{alertContents}</div>
                    <div className="flex justify-end">
                        {alertFooterActiveBtn && (
                            <div>
                                <PurpleBtn
                                    func={handleAlertFooterActiveFunc}
                                    content={alertFooterActiveBtn}
                                />
                            </div>
                        )}
                    </div>
                </div>
                {/* <button
                        onClick={handleCloseAlert}
                        className="absolute top-0 z-0 w-screen h-screen"
                    ></button> */}
            </div>
        </div>
    );
}

export default BasicAlert;
