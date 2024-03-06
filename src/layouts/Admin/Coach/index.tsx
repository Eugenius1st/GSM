// EgMaterial
import BasicTable from 'components/EgMaterials/BasicTable';
// Cards
import ProfileCard from 'components/Cards/ProfileCard';
// Common
import Divider from 'components/Common/Divider';

const Coach = () => {
    return (
        <div className="eg-admin-wrapper">
            <div className="eg-title">코치관리</div>
            <ProfileCard />
            <Divider />
            <div className="text-right">Edit</div>
            <Divider />
            <BasicTable />
        </div>
    );
};

export default Coach;
