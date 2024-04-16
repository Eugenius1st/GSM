// hooks
import { useState } from 'react';
// icons
import { CgClose } from 'react-icons/cg';
import { IoMdSearch } from 'react-icons/io';
// Buttons
import CustomBtn from 'components/Buttons/CustomBtn';
// Components
import MapSearch from 'components/Map/MapSearch';
// Buttons
import PurpleBtn from 'components/Buttons/PurpleBtn';
interface MapDataType {
    address_name?: string;
    category_group_code?: string;
    category_group_name?: string;
    category_name?: string;
    distance?: string;
    id?: string;
    phone?: string;
    place_name?: string;
    place_url?: string;
    road_address_name: string;
    x: string;
    y: string;
}
const ResidenceSearchModal = () => {
    const [isShow, setIsShow] = useState(false);
    const [residence, setResidence] = useState<MapDataType>();
    const handleShowModal = () => {
        setIsShow(true);
        document.body.style.overflow = 'hidden';
    };
    const handleCloseModal = () => {
        setIsShow(false);
        document.body.style.overflow = 'unset';
    };
    const confirmResidence = () => {
        handleCloseModal();
    };
    return (
        <div>
            <CustomBtn
                content={
                    <div className="flex items-center p-1 border rounded-md border-egGrey-default">
                        <div className="mr-1 text-sm">주소찾기</div>
                        <IoMdSearch />
                    </div>
                }
                func={handleShowModal}
            />

            {isShow ? (
                <div className="fixed flex justify-center items-center top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] border border-red-100 z-[60]">
                    <div className="fixed bg-egWhite-default z-[70] w-4/6 h-4/6 p-4 rounded-lg">
                        <div className="flex justify-between mb-4">
                            <div className="mr-1 text-lg font-bold">주소찾기</div>
                            <CgClose onClick={handleCloseModal} />
                        </div>

                        <MapSearch
                            // residence={residence}
                            setResidence={setResidence}
                        />
                        <div className="flex justify-between">
                            <div className="flex items-center mr-2 font-bold text-egPurple-default">
                                내 주소
                                <div className="font-medium text-egBlack-default">
                                    {residence ? (
                                        ` : ${residence.road_address_name}`
                                    ) : (
                                        <div className="text-egGrey-default">{` : 아직 선택되지 않았습니다`}</div>
                                    )}
                                </div>
                            </div>
                            <PurpleBtn
                                content="주소 선택"
                                func={residence && confirmResidence}
                            />
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleCloseModal}
                        className="absolute top-0 z-0 w-screen h-screen"
                    ></button>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};
export default ResidenceSearchModal;
