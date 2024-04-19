// icons
import { MdSentimentSatisfiedAlt } from 'react-icons/md';
export interface EmptyCard {
    content?: string;
    customStyle?: string;
}
const EmptyCard = ({ content = '준비중입니다', customStyle }: EmptyCard) => {
    return (
        <div className="w-full">
            <div
                className={
                    customStyle
                        ? customStyle
                        : 'flex flex-col items-center justify-center py-40 my-5 border border-egGrey-default text-egPurple-semiLight'
                }
            >
                <div>
                    <MdSentimentSatisfiedAlt className="w-10 h-10 mb-5" />
                </div>
                <div>{content}</div>
            </div>
        </div>
    );
};

export default EmptyCard;
