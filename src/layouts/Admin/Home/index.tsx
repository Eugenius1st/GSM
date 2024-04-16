// hooks
import { useLocation } from 'react-router-dom';
// Common
import Divider from 'components/Common/Divider';
// Eg Components
import EgPageTable from 'components/EgMaterials/PageTable';
import EgPhotoCard from 'components/EgMaterials/PhotoCard';
// Admin Home Components
import TitleBar from 'layouts/Admin/Home/Components/TitleBar';
// images
import coach_son from 'assets/coach/coach_son.jpeg';
import coach_kim from 'assets/coach/coach_kim.jpeg';
import coach_hong from 'assets/coach/coach_hong.jpeg';
import class_adult_man from 'assets/class/class_adult_man.jpeg';
import class_adult_woman from 'assets/class/class_adult_woman.jpeg';
import user1 from 'assets/user/user1.jpg';
import user2 from 'assets/user/user2.png';
import user3 from 'assets/user/user3.jpeg';
import user4 from 'assets/user/user4.png';

export interface ColumnType {
    id: string;
    label: string;
    minWidth?: number;
    align?: 'center' | 'left' | 'right' | 'inherit' | 'justify' | undefined;
    infoBtn?: string;
}

const Home = () => {
    const location = useLocation().pathname;
    const coachInfo = [
        { id: 1, name: '손흥민', birthYear: 1998, image: coach_son, type: 'coach' },
        { id: 2, name: '김민재', birthYear: 2000, image: coach_kim, type: 'coach' },
        { id: 3, name: '홍길동', birthYear: 1994, image: coach_hong, type: 'coach' },
    ];
    const classInfo = [
        { id: 1, name: '성인남성반', image: class_adult_man, describe: '성인 남성반에 대한 설명입니다', type: 'class' },
        {
            id: 2,
            name: '성인여성반',
            image: class_adult_woman,
            describe: '성인 여성반에 대한 설명입니다',
            type: 'class',
        },
    ];
    const usersInfoCol: ColumnType[] = [
        { id: 'thumnail', label: 'Profile', minWidth: 30, align: 'left' },
        { id: 'name', label: 'Name', minWidth: 30, align: 'center' },
        { id: 'age', label: 'Age', minWidth: 30, align: 'center' },
        { id: 'infoBtn', label: '정보보기', minWidth: 30, align: 'center' },
    ];
    const usersInfoRow = [
        { userId: 1, thumnail: user1, name: '안유진z', age: '27', align: 'center', minWidth: 30, infoBtn: '정보보기' },
        { userId: 2, thumnail: user2, name: '상훈손', age: '20', align: 'center', minWidth: 30, infoBtn: '정보보기' },
        { userId: 3, thumnail: user3, name: '최보미', age: '20', align: 'center', minWidth: 30, infoBtn: '정보보기' },
        { userId: 4, thumnail: user4, name: '조영준', age: '7', align: 'center', minWidth: 30, infoBtn: '정보보기' },
        { userId: 5, thumnail: user1, name: '안유진', age: '27', align: 'center', minWidth: 30, infoBtn: '정보보기' },
        { userId: 6, thumnail: user1, name: '안유진', age: '27', align: 'center', minWidth: 30, infoBtn: '정보보기' },
        { userId: 7, thumnail: user3, name: '최보미', age: '20', align: 'center', minWidth: 30, infoBtn: '정보보기' },
        { userId: 8, thumnail: user4, name: '조영준', age: '7', align: 'center', minWidth: 30, infoBtn: '정보보기' },
        { userId: 9, thumnail: user1, name: '안유진', age: '27', align: 'center', minWidth: 30, infoBtn: '정보보기' },
        { userId: 10, thumnail: user1, name: '안유진', age: '27', align: 'center', minWidth: 30, infoBtn: '정보보기' },
    ];
    console.log(process.env.REACT_APP_API_URL, 'process.env.REACT_APP_API_URL');

    return (
        <div className="eg-default-wrapper">
            <TitleBar
                title="회원관리"
                navigationURL="/admin/user"
            />
            <EgPageTable
                columns={usersInfoCol}
                rows={usersInfoRow}
                btnLink={`${location}/user`}
            />
            <Divider />
            <TitleBar
                title="코치관리"
                navigationURL="/admin/coach"
            />
            <div className="flex justify-between">
                {coachInfo.map((el, idx) => (
                    <EgPhotoCard
                        key={idx}
                        id={el.id}
                        name={el.name}
                        birthYear={el.birthYear}
                        image={el.image}
                        imageY={180}
                        type={el.type}
                    />
                ))}
            </div>
            <Divider />
            <TitleBar
                title="수업관리"
                navigationURL="/admin/class"
            />
            <div className="flex justify-between">
                {classInfo.map((el, idx) => (
                    <EgPhotoCard
                        key={idx}
                        id={el.id}
                        name={el.name}
                        image={el.image}
                        describe={el.describe}
                        imageY={180}
                        type={el.type}
                    />
                ))}
            </div>
            <Divider />
        </div>
    );
};

export default Home;
