// hooks
import React, { useState, useEffect } from 'react';
import { MapMarker, Map, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { useRecoilValue } from 'recoil';
import { IsMobileSelector } from 'atom/isMobile';
// icons
import { IoSearch } from 'react-icons/io5';
import { IoLocationSharp } from 'react-icons/io5';
// images
import marker_purple from 'assets/map/marker_purple.png';

// window 객체에 kakao 속성 추가
declare global {
    interface Window {
        kakao: any;
    }
}

// MapSearch 함수 컴포넌트 정의
// interface MapDataType {
//     address_name?: string;
//     category_group_code?: string;
//     category_group_name?: string;
//     category_name?: string;
//     distance?: string;
//     id?: string;
//     phone?: string;
//     place_name?: string;
//     place_url?: string;
//     road_address_name: string;
//     region_2depth_name?: string;
//     x: string;
//     y: string;
// }
interface MapDataType {
    position: {
        lat: number;
        lng: number;
    };
    content: string;
    address_name?: string;
    road_address_name: string;
    region_2depth_name?: string;
    x: string;
    y: string;
}
interface MapSearchProps {
    setResidence?: (value: MapDataType) => void;
}

export default function MapSearch({ setResidence }: MapSearchProps) {
    let isMobile = useRecoilValue(IsMobileSelector);
    const [info, setInfo] = useState<MapDataType | undefined>();
    const [markers, setMarkers] = useState<MapDataType[]>([]);
    const [map, setMap] = useState<any>();
    const [keyword, setKeyword] = useState<string>('');
    // map이 변경될 때마다 mapRender 함수 호출
    useEffect(() => {
        mapRender();
    }, [map]);

    // 지도 렌더링 함수
    function mapRender() {
        if (!map || !keyword.trim()) return;

        const ps = new window.kakao.maps.services.Places();

        ps.keywordSearch(keyword, (data: any, status: any, _pagination: any) => {
            if (status === window.kakao.maps.services.Status.OK) {
                const bounds = new window.kakao.maps.LatLngBounds();
                let markers: MapDataType[] = [];
                for (var i = 0; i < data.length; i++) {
                    markers.push({
                        position: {
                            lat: data[i].y,
                            lng: data[i].x,
                        },
                        content: data[i].place_name,
                        address_name: data[i].address_name,
                        road_address_name: data[i].road_address_name,
                        region_2depth_name: data[i].region_2depth_name,
                        x: data[i].x,
                        y: data[i].y,
                    });
                    bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
                }
                setMarkers(markers);
                map.setBounds(bounds);
            }
        });
    }

    // 키워드 입력 이벤트 핸들러
    const handleKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    };

    // 검색 버튼 클릭 이벤트 핸들러
    const handleSearch = () => {
        setInfo(undefined);
        mapRender();
    };

    // 특정 키워드 선택 이벤트 핸들러
    const selectOneKeyword = (data: MapDataType) => {
        if (setResidence && data) {
            setMarkers([data]);
            setInfo(data);
            setResidence(data);
        }
    };

    return (
        <div>
            {isMobile ? (
                <Map // 로드뷰를 표시할 Container
                    center={{
                        lat: 37.566826,
                        lng: 126.9786567,
                    }}
                    style={{
                        width: '100%',
                        height: '85%',
                        borderRadius: '10px',
                        display: 'relative',
                    }}
                    level={3}
                    onCreate={setMap}
                    draggable={true}
                >
                    {/* 주소 검색 박스 */}
                    <div className="bg-[rgba(256,256,256,0.8)]  p-2 z-10 left-8 top-20 rounded-md overflow-y-scroll">
                        <div className="flex justify-between p-1 mr-2 border rounded-md border-egPurple-default">
                            <input
                                placeholder="주소를 입력해주세요"
                                value={keyword}
                                type="text"
                                className="w-full px-1 focus:outline-none"
                                onChange={(e) => handleKeyword(e)}
                            />
                            <IoSearch
                                onClick={handleSearch}
                                className="w-8 h-8 p-1 rounded-md text-egPurple-default hover:bg-egPurple-superLight"
                            />
                        </div>

                        {/* 검색 결과 표시 */}
                        <div className="h-[17rem]">
                            {markers.length > 0 ? (
                                <div>
                                    {markers.map((el, idx) => (
                                        <div
                                            key={idx}
                                            className="p-2 border"
                                            onClick={() => selectOneKeyword(el)}
                                        >
                                            <div className="flex items-center mb-2 text-sm">
                                                <IoLocationSharp className="text-egPurple-default" />
                                                {el.content}
                                            </div>
                                            <div className="text-xs">{el.address_name}</div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="h-[90%] flex items-center justify-center text-sm text-egPurple-default">
                                    <div className="mt-2">검색 결과가 없습니다</div>
                                </div>
                            )}
                        </div>
                    </div>
                </Map>
            ) : (
                <Map // 로드뷰를 표시할 Container
                    center={{
                        lat: 37.566826,
                        lng: 126.9786567,
                    }}
                    style={{
                        width: '100%',
                        height: '40rem',
                        borderRadius: '10px',
                        display: 'relative',
                    }}
                    level={3}
                    onCreate={setMap}
                    draggable={true}
                >
                    {/* 마커 표시하기 */}
                    {markers.map((marker, idx) => (
                        <div key={idx}>
                            <MapMarker
                                position={marker.position}
                                image={{
                                    src: marker_purple, // 마커이미지의 주소입니다
                                    size: {
                                        width: 30,
                                        height: 54,
                                    }, // 마커이미지의 크기입니다
                                    options: {
                                        offset: {
                                            x: 27,
                                            y: 69,
                                        }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
                                    },
                                }}
                                onClick={() => setInfo(marker)}
                            ></MapMarker>
                            <div>
                                {info && info.content === marker.content && (
                                    <CustomOverlayMap // 커스텀 오버레이를 표시할 Container
                                        position={{
                                            lat: marker.position?.lat,
                                            lng: marker.position?.lng,
                                        }}
                                        // 커스텀 오버레이가에 대한 확장 옵션
                                        xAnchor={0.5}
                                        yAnchor={1.9}
                                    >
                                        <div className="relative px-2 py-4 text-center border-2 rounded-md bg-egPurple-superLight border-egPurple-default">
                                            <div className="text-egPurple-default">{marker.content}</div>
                                            <div className="text-egBlack-default">{marker.road_address_name}</div>
                                        </div>
                                    </CustomOverlayMap>
                                )}
                            </div>
                        </div>
                    ))}

                    {/* 주소 검색 박스 */}
                    <div className="bg-[rgba(256,256,256,0.8)] absolute w-1/4 p-2 z-10 left-8 top-20 h-4/6 rounded-md overflow-y-scroll">
                        <div className="flex justify-between p-1 mr-2 border rounded-md border-egPurple-default">
                            <input
                                placeholder="주소를 입력해주세요"
                                value={keyword}
                                type="text"
                                className="w-full px-1 focus:outline-none"
                                onChange={(e) => handleKeyword(e)}
                            />
                            <IoSearch
                                onClick={handleSearch}
                                className="w-8 h-8 p-1 rounded-md text-egPurple-default hover:bg-egPurple-superLight"
                            />
                        </div>

                        {/* 검색 결과 표시 */}
                        {markers.length > 0 ? (
                            <div>
                                {markers.map((el, idx) => (
                                    <div
                                        key={idx}
                                        className="p-2 border"
                                        onClick={() => selectOneKeyword(el)}
                                    >
                                        <div className="flex items-center mb-2 text-sm">
                                            <IoLocationSharp className="text-egPurple-default" />
                                            {el.content}
                                        </div>
                                        <div className="text-xs">{el.address_name}</div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="h-[90%] flex items-center justify-center text-sm text-egPurple-default">
                                <div className="mt-2">검색 결과가 없습니다</div>
                            </div>
                        )}
                    </div>
                </Map>
            )}
        </div>
    );
}
