// Cards
import MemoCard from 'components/Cards/MemoCard';
// Common
import Divider from 'components/Common/Divider';
// images
import coach_son from 'assets/coach/coach_son.jpeg';
// Admin Coach Components
import CoachProfileCard from 'layouts/Admin/Coach/Components/CoachProfileCard';

const CoachDetail = () => {
    const coachInfo = {
        thumbnail: coach_son,
        name: '손흥민',
        birth: '1998-08-25',
        gender: 'man',
        duty: false,
        license: ['자격증1', '자격증2', '자격증3'],
        record: [
            { date: 2001, title: '프로선수출신' },
            { date: 1990, title: '명문고' },
            { date: 1995, title: '명문중' },
        ],
    };
    const coachMemo = {
        salary: '3000 만원',
        significant: [
            {
                date: '2024-03-07',
                content:
                    '태도가 아주 좋음 태도가 아주 좋음 태도가 아주 좋음 태도가 아주 좋음 태도가 아주 좋음 태도가 아주 좋음',
            },
            { date: '2024-03-07', content: '태도가 아주 좋음' },
            { date: '2024-03-07', content: '태도가 아주 좋음' },
            { date: '2024-03-07', content: '태도가 아주 좋음' },
            { date: '2024-03-05', content: '인사성 밝음' },
            { date: '2024-03-04', content: '아이들 이름 외울 필요 있음' },
        ],
    };
    return (
        <div className="eg-default-wrapper">
            <div className="eg-title">코치관리</div>
            <div className="text-sm text-right">Edit</div>
            <CoachProfileCard coachInfo={coachInfo} />
            <Divider />
            <MemoCard
                tab={['임금', '특이사항']}
                memo={coachMemo}
            />
        </div>
    );
};

export default CoachDetail;
