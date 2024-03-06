import coach_son from 'assets/coach/coach_son.jpeg';

// EgMaterial
import BasicTable from 'components/EgMaterials/BasicTable';

const ProfileCard = () => {
    return (
        <div className="flex items-center">
            <img
                src={coach_son}
                alt="coach_son"
                className="mr-4 rounded-full h-28"
            />
            <BasicTable />
        </div>
    );
};

export default ProfileCard;
