// Commons
import TagCard from 'components/Common/TagCard';
import Divider from 'components/Common/Divider';

const ResearchInfo = () => {
    const technicalSkill = [
        '패스',
        '드리블',
        '위치선정',
        '패널티킥',
        '코너킥',
        '퍼스트 터치',
        '프리킥',
        '볼 트래핑',
        '장거리 스로인',
        '크로스',
        '오프더볼',
        '태클',
        '일대일 마크',
        '헤딩',
        '중거리슛',
        '골 결정력',
    ];
    const mentalSkill = [
        '시야',
        '대담함',
        '리더쉽',
        '승부욕',
        '예측력',
        '적극성',
        '집중력',
        '침착성',
        '팀워크',
        '판단력',
        '활동력',
    ];
    const physicalSkill = ['체력', '스피드', '몸싸움', '민첩성', '지구력', '균형감각'];
    return (
        <div>
            <div className="flex flex-col items-center justify-center w-full pb-10">
                <div className="eg-title">나의 축구 기술 조사</div>
                <div className="w-fit">
                    <div>⦁ 선수님들의 기술 및 경기력 향상에 필요한 정보입니다.</div>
                    <div>⦁ GSM을 이용하시는데 더 편리할 수 있게 도와드려요.</div>
                </div>
            </div>
            {/* 내 장점 */}
            <div className="px-6 py-1 m-auto border w-fit border-egGrey-default">내 장점</div>
            <div className="p-2 mt-6 border border-egGrey-default">
                <div className="mt-1 mb-2">기술적 능력 선택(3가지 이상)</div>
                <TagCard tagList={technicalSkill} />
            </div>
            <div className="p-2 mt-6 border border-egGrey-default">
                <div className="mt-1 mb-2">기술적 능력 선택(3가지 이상)</div>
                <TagCard tagList={mentalSkill} />
            </div>
            <div className="p-2 mt-6 border border-egGrey-default">
                <div className="mt-1 mb-2">기술적 능력 선택(3가지 이상)</div>
                <TagCard tagList={physicalSkill} />
            </div>

            <Divider />
            {/* 개선 희망점 */}
            <div className="px-6 py-1 m-auto border w-fit border-egGrey-default">개선 희망점</div>
            <div className="p-2 mt-6 border border-egGrey-default">
                <div className="mt-1 mb-2">기술적 능력 선택(3가지 이상)</div>
                <TagCard tagList={technicalSkill} />
            </div>
            <div className="p-2 mt-6 border border-egGrey-default">
                <div className="mt-1 mb-2">기술적 능력 선택(3가지 이상)</div>
                <TagCard tagList={mentalSkill} />
            </div>
            <div className="p-2 mt-6 border border-egGrey-default">
                <div className="mt-1 mb-2">기술적 능력 선택(3가지 이상)</div>
                <TagCard tagList={physicalSkill} />
            </div>
        </div>
    );
};

export default ResearchInfo;
