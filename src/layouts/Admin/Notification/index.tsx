// Buttons
import WhiteBtn from 'components/Buttons/WhiteBtn';
// Eg Components
import EgPageTable from 'components/EgMaterials/PageTable';
import NotifiactionTable from 'layouts/Admin/Notification/Components/NotificationTable';
// images
import coach_son from 'assets/coach/coach_son.jpeg';
import coach_kim from 'assets/coach/coach_kim.jpeg';
import coach_hong from 'assets/coach/coach_hong.jpeg';

export interface ColumnType {
    id: string;
    label: string;
    minWidth?: number;
    align?: 'center' | 'left' | 'right' | 'inherit' | 'justify' | undefined;
}
const Notification = () => {
    const coachesInfoCol: ColumnType[] = [
        { id: 'id', label: 'id', minWidth: 100, align: 'left' },
        { id: 'thumnail', label: 'Profile', minWidth: 100, align: 'left' },
        { id: 'name', label: 'Name', minWidth: 100, align: 'center' },
        { id: 'age', label: 'Age', minWidth: 100, align: 'center' },
        { id: 'infoBtn', label: '정보보기', minWidth: 100, align: 'center' },
        { id: 'classBtn', label: '수업보기', minWidth: 100, align: 'center' },
    ];

    const coachesInfoRow = [
        {
            id: 1,
            thumbnail: coach_son,
            name: '손흥민',
            birth: '1998',
            infoBtn: true,
            classBtn: true,
        },
        {
            id: 2,
            thumbnail: coach_kim,
            name: '김민재',
            birth: '1997',
            infoBtn: true,
            classBtn: true,
        },
        {
            id: 3,
            thumbnail: coach_hong,
            name: '홍길동',
            birth: '2000',
            infoBtn: true,
            classBtn: true,
        },
    ];

    return (
        <div className="mb-2 eg-default-wrapper">
            <div className="eg-title">알림 및 안내</div>
            <NotifiactionTable />
        </div>
    );
};

export default Notification;
