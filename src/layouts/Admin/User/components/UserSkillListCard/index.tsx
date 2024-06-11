// Common
import PurpleTag from 'components/Common/Tags/PurpleTag';
import CustomTag from 'components/Common/Tags/CustomTag';
import Divider from 'components/Common/Divider';
import { useEffect, useState } from 'react';

interface SkillList {
    technicalSkill: string[];
    mentalSkill: string[];
    physicalSkill: string[];
}
interface prosImproType {
    category: string;
    name: string;
    _id: string;
}

interface UserSkillListCardType {
    title?: string;
    userSkills: prosImproType[];
}
const UserSkillListCard = ({ title, userSkills }: UserSkillListCardType) => {
    const infoStyle = 'mb-2 pb-1 flex border-b border-egGrey-default';
    const skillWrapper = ' mb-1 flex items-center';
    const titleStyle = 'mr-2';
    const highLight = 'px-1 bg-egPurple-superLight font-bold';

    const [mentalSkill, setMentalSkill] = useState([]);
    const [physicalSkill, setPhysicalSkill] = useState([]);
    const [technicalSkill, setTechnicalSkill] = useState([]);

    useEffect(() => {
        const categorizedArrays = userSkills.reduce((acc: any, skill) => {
            if (!acc[skill.category]) {
                acc[skill.category] = [];
            }
            acc[skill.category].push(skill.name);
            return acc;
        }, {});
        const technicalArray = categorizedArrays.technical || [];
        const mentalArray = categorizedArrays.mental || [];
        const physicalArray = categorizedArrays.physical || [];
        setTechnicalSkill(technicalArray);
        setMentalSkill(mentalArray);
        setPhysicalSkill(physicalArray);
    }, [userSkills]);
    return (
        <div className="w-full">
            <div className="flex flex-col justify-center w-full mt-2 rounded-md">
                <div className={infoStyle}>
                    <span className={highLight}>{title}</span>
                </div>
                <div className={skillWrapper}>
                    <div className={titleStyle}>기술적 능력</div>
                    <PurpleTag tagList={technicalSkill} />
                </div>
                <div className={skillWrapper}>
                    <div className={titleStyle}>정신적 능력</div>
                    <PurpleTag tagList={mentalSkill} />
                </div>
                <div className={skillWrapper}>
                    <div className={titleStyle}>신체적 능력</div>
                    <PurpleTag tagList={physicalSkill} />
                </div>
            </div>
        </div>
    );
};

export default UserSkillListCard;
