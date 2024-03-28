// hooks
import { KeyboardEvent } from 'react';
interface WhiteBtnType {
    width?: string | 'fit';
    content: string;
    customStyle?: string;
    func?: () => void;
    enterPress?: (e: KeyboardEvent<HTMLInputElement>) => void;
}
const WhiteBtn = ({ content, width, customStyle, enterPress, func }: WhiteBtnType) => {
    return (
        <button
            onKeyDown={() => enterPress}
            onClick={func}
            className={`${customStyle} px-4 py-2 m-1 rounded-md text-egPurple-default bg-egGrey-semiLight hover:bg-egPurple-superLght w-${width} active:bg-egPurple-default active:text-egWhite-default`}
        >
            {content}
        </button>
    );
};
export default WhiteBtn;
