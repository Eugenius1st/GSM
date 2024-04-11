// Buttons
import CustomBtn from 'components/Buttons/CustomBtn';
// hooks
import { useState } from 'react';
// icons
import { CgClose } from 'react-icons/cg';
import { IoMdSearch } from 'react-icons/io';

const ResidenceSearchModal = () => {
    const [isShow, setIsShow] = useState(false);
    const handleShowModal = () => {
        setIsShow(true);
        document.body.style.overflow = 'hidden';
    };
    const handleCloseModal = () => {
        setIsShow(false);
        document.body.style.overflow = 'unset';
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
                    <div className="fixed bg-egWhite-default z-[70] w-[30rem] p-4 rounded-lg">
                        <div className="flex justify-end">
                            <CgClose onClick={handleCloseModal} />
                        </div>
                    </div>
                    <button
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

// function KakaoMap(){
//     const [info, setInfo] = useState()
//     const [markers, setMarkers] = useState([])
//     const [map, setMap] = useState()

//     useEffect(() => {
//       if (!map) return
//       const ps = new kakao.maps.services.Places()

//       ps.keywordSearch("이태원 맛집", (data, status, _pagination) => {
//         if (status === kakao.maps.services.Status.OK) {
//           // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
//           // LatLngBounds 객체에 좌표를 추가합니다
//           const bounds = new kakao.maps.LatLngBounds()
//           let markers = []

//           for (var i = 0; i < data.length; i++) {
//             // @ts-ignore
//             markers.push({
//               position: {
//                 lat: data[i].y,
//                 lng: data[i].x,
//               },
//               content: data[i].place_name,
//             })
//             // @ts-ignore
//             bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
//           }
//           setMarkers(markers)

//           // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
//           map.setBounds(bounds)
//         }
//       })
//     }, [map])

//     return (
//       <Map // 로드뷰를 표시할 Container
//         center={{
//           lat: 37.566826,
//           lng: 126.9786567,
//         }}
//         style={{
//           width: "100%",
//           height: "350px",
//         }}
//         level={3}
//         onCreate={setMap}
//       >
//         {markers.map((marker) => (
//           <MapMarker
//             key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
//             position={marker.position}
//             onClick={() => setInfo(marker)}
//           >
//             {info &&info.content === marker.content && (
//               <div style={{color:"#000"}}>{marker.content}</div>
//             )}
//           </MapMarker>
//         ))}
//       </Map>
//     )
//   }
