// hooks
import { KeyboardEvent } from 'react';
interface GreyBorderBtnType {
    width?: string | 'fit';
    content: string;
    customStyle?: string;
    func?: () => void;
    enterPress?: (e: KeyboardEvent<HTMLInputElement>) => void;
}
const GreyBorderBtn = ({ content, width, customStyle, enterPress, func }: GreyBorderBtnType) => {
    return (
        <button
            onKeyDown={() => enterPress}
            onClick={func}
            className={`${customStyle} px-4 py-2 m-1 rounded-md text-egGrey-default border border-egGrey-default  hover:bg-egPurple-default w-${width} hover:text-egWhite-default hover:border-egPurple-default active:bg-egPurple-default active:text-egWhite-default`}
        >
            {content}
        </button>
    );
};
export default GreyBorderBtn;
