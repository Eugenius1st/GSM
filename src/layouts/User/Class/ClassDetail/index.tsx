// Class Components
import ViewUserCard from 'layouts/User/Class/components/ViewUserCard';
// Cards
import ClassCard from 'layouts/Admin/Class/Components/ClassCard';
// images
import class_adult_woman from 'assets/class/class_adult_woman.jpeg';
import user1 from 'assets/user/user1.jpg';
import user2 from 'assets/user/user2.png';
import user3 from 'assets/user/user3.jpeg';
import user4 from 'assets/user/user4.png';
// Commons
import Divider from 'components/Common/Divider';

const ClassDetail = () => {
    const classInfo = {
        id: 1,
        classImage: class_adult_woman,
        title: '성인남성반',
        date: '2024-03-09',
        location: '수원점',
        attend: '8/10',
        waiting: 4,
        coaches: ['안유진', '최보미'],
        notice: '신장 00cm 제한입니다. 조건에 맞지 않는 신청시, 취소됩니다.',
    };
    const attendInfo = [
        { profile: user1, name: '홍길동', age: 13, attend: '출석' },
        { profile: user2, name: '홍이동', age: 13, attend: '불참' },
        { profile: user3, name: '홍삼동', age: 13, attend: '지각' },
        { profile: user4, name: '홍사동', age: 13, attend: '취소' },
        { profile: user1, name: '홍길동', age: 13, attend: '출석' },
        { profile: user2, name: '홍이동', age: 13, attend: '불참' },
        { profile: user3, name: '홍삼동', age: 13, attend: '지각' },
        { profile: user4, name: '홍사동', age: 13, attend: '취소' },
    ];
    const waitingInfo = [
        { profile: user1, name: '홍길동', age: 13, attend: '출석' },
        { profile: user2, name: '홍이동', age: 13, attend: '불참' },
        { profile: user3, name: '홍삼동', age: 13, attend: '지각' },
        { profile: user4, name: '홍사동', age: 13, attend: '취소' },
    ];

    return (
        <div className="eg-default-wrapper">
            <div className="flex items-center justify-between eg-title">
                <div className="flex items-center">
                    <span> 수업정보</span>
                </div>
            </div>
            <div>
                <ClassCard classInfo={classInfo} />
            </div>

            <Divider />
            <div className="text-lg font-bold">참석자 명단</div>

            <Divider />
            <ViewUserCard attendInfo={attendInfo} />

            <Divider />
            <div className="text-lg font-bold">대기자 명단</div>

            <Divider />
            <ViewUserCard attendInfo={waitingInfo} />

            <Divider />
        </div>
    );
};

export default ClassDetail;
