// EgMaterial
import BasicTable from 'components/EgMaterials/BasicTable';
// Cards
import ProfileCard from 'components/Cards/ProfileCard';
const Coach = () => {
    return (
        <div className="eg-admin-wrapper">
            <div className="eg-title">코치관리</div>
            <ProfileCard />

            <BasicTable />
        </div>
    );
};

export default Coach;
