// Commons
import Divider from 'components/Common/Divider';
// Eg Components
import EgTable from 'components/EgMaterials/PageTable';
import EgPhotoCard from 'components/EgMaterials/PhotoCard';
// Admin Home Components
import TitleBar from 'layouts/Admin/Home/Components/TitleBar';
// images
import coach_son from 'assets/coach/coach_son.jpeg';
import coach_kim from 'assets/coach/coach_kim.jpeg';
import coach_hong from 'assets/coach/coach_hong.jpeg';
import class_adult_man from 'assets/class/class_adult_man.jpeg';
import class_adult_woman from 'assets/class/class_adult_woman.jpeg';

const Home = () => {
    const coachInfo = [
        { name: '손흥민', image: coach_son },
        { name: '김민재', image: coach_kim },
        { name: '홍길동', image: coach_hong },
    ];
    const classInfo = [
        { name: '성인남성반', image: class_adult_man },
        { name: '성인여성반', image: class_adult_woman },
    ];
    return (
        <div className="eg-admin-wrapper">
            <TitleBar
                title="회원관리"
                navigationURL="/user-management"
            />
            <EgTable />
            <Divider />
            <TitleBar
                title="코치관리"
                navigationURL="/coach-management"
            />
            <div className="flex justify-between">
                {coachInfo.map((el, idx) => (
                    <EgPhotoCard
                        key={idx}
                        name={el.name}
                        image={el.image}
                        imageY={180}
                    />
                ))}
            </div>
            <Divider />
            <TitleBar
                title="수업관리"
                navigationURL="/class-management"
            />
            <div className="flex justify-between">
                {classInfo.map((el, idx) => (
                    <EgPhotoCard
                        key={idx}
                        name={el.name}
                        image={el.image}
                        imageY={180}
                    />
                ))}
            </div>
            <Divider />
            <TitleBar
                title="알림 및 안내"
                navigationURL="/notification"
            />
        </div>
    );
};

export default Home;
