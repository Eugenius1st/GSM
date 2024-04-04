// Common Components
import PurpleTag from 'components/Common/Tags/PurpleTag';
import Divider from 'components/Common/Divider';

interface SkillList {
    technicalSkill: string[];
    mentalSkill: string[];
    physicalSkill: string[];
}
interface UserSkillCardType {
    advantages: SkillList;
    improvement: SkillList;
}
const UserSkillCard = ({ advantages, improvement }: UserSkillCardType) => {
    const infoStyle = 'mb-2 pb-1 flex border-b border-egGrey-default';
    const titleStyle = 'mt-2 mb-1';
    const highLight = 'px-1 bg-egPurple-superLight';

    return (
        <div className="w-full px-4 border border-egGrey-default">
            <div className="eg-title">나의 축구 기술</div>
            <div className="flex flex-col justify-center w-full mt-8 rounded-md">
                <div className={infoStyle}>
                    <span className={highLight}>내 장점</span>
                </div>
                <div className={titleStyle}>기술적 능력</div>
                <PurpleTag tagList={advantages.technicalSkill} />
                <div className={titleStyle}>정신적 능력</div>
                <PurpleTag tagList={advantages.mentalSkill} />
                <div className={titleStyle}>신체적 능력</div>
                <PurpleTag tagList={advantages.physicalSkill} />
                <Divider />
                <div className={infoStyle}>
                    <span className={highLight}>개선 희망점</span>
                </div>
                <div className={titleStyle}>기술적 능력</div>
                <PurpleTag tagList={improvement.technicalSkill} />
                <div className={titleStyle}>정신적 능력</div>
                <PurpleTag tagList={improvement.mentalSkill} />
                <div className={titleStyle}>신체적 능력</div>
                <PurpleTag tagList={improvement.physicalSkill} />
            </div>
            <Divider />
        </div>
    );
};

export default UserSkillCard;
