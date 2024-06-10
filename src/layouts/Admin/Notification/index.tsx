// hooks
import { useParams } from 'react-router-dom';
// Buttons
import WhiteBtn from 'components/Buttons/WhiteBtn';
// Eg Components
import EgPageTable from 'components/EgMaterials/PageTable';
// NotificatioinContents
import Application from 'layouts/Admin/Notification/components/Application';
import AllNotification from 'layouts/Admin/Notification/components/AllNotification';
import RoundDebuction from 'layouts/Admin/Notification/components/RoundDebuction';
import AlarmTable from 'layouts/Admin/Notification/components/AlarmTable';
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
    const { category } = useParams();

    return (
        <div className="mb-2 eg-default-wrapper">
            <div className="eg-title">알림 및 안내</div>
            {category === 'entire' ? (
                <AllNotification />
            ) : category === 'application' ? (
                <Application />
            ) : category === 'round' ? (
                <RoundDebuction />
            ) : (
                <AllNotification />
            )}
            <AlarmTable />
        </div>
    );
};

export default Notification;
