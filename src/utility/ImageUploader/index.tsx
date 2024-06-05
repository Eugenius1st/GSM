// hooks
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { requestDelete } from 'api/basic';

// images
import userTempPhoto from 'assets/user/userTempPhoto.png';

interface ImageUploaderType {
    type: string;
    uploadedId: string;
    uploadCustomBtn?: React.ReactNode; // 커스텀 클래스 prop 추가
    previewImgStyle?: string; // 커스텀 클래스 prop 추가
}

const ImageUploader: React.FC<ImageUploaderType> = ({
    type = 'admin',
    uploadedId,
    uploadCustomBtn,
    previewImgStyle,
}) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/photo/${type}/${uploadedId}?isThumbnail=true`, {
                responseType: 'blob',
            })
            .then((response) => {
                const url = window.URL.createObjectURL(
                    new Blob([response.data], { type: response.headers['content-type'] })
                );
                setPreviewUrl(url);
            })
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        if (!selectedFile) {
            setPreviewUrl(null);
            return;
        }
        // 미리보기
        const url = URL.createObjectURL(selectedFile);
        setPreviewUrl(url);
        return () => URL.revokeObjectURL(url);
    }, [selectedFile]);

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            const fileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
            const maxSize = 5 * 1024 * 1024; // 5MB

            if (!fileTypes.includes(file.type)) {
                alert('jpeg, jpg, png 파일만 업로드 가능합니다.');
            } else if (file.size > maxSize) {
                alert('5MB 이하의 사진을 업로드 하세요');
            } else {
                setSelectedFile(file);
            }
        }
    };

    const handlePostPhoto = () => {
        const data = new FormData();
        if (selectedFile) {
            data.append('id', uploadedId);
            data.append('photo', selectedFile);

            axios
                .post(`${process.env.REACT_APP_API_URL}/photo/${type}`, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then((res) => alert('변경되었습니다.'))
                .catch((err) => console.log(err));
        }
    };
    const handleDeletePhoto = () => {
        requestDelete({
            requestUrl: `/photo/${type}`,
            data: {
                id: uploadedId,
            },
        });
        alert('삭제되었습니다');
        setPreviewUrl(null);
        setSelectedFile(null);
    };
    return (
        <div>
            <div className="relative m-auto w-fit">
                {previewUrl ? (
                    <div>
                        <img
                            src={previewUrl}
                            alt="Preview"
                            className={previewImgStyle}
                        />
                    </div>
                ) : (
                    <div>
                        <img
                            src={userTempPhoto}
                            alt="userTempPhoto"
                            className={previewImgStyle}
                        />
                    </div>
                )}

                <label htmlFor="select_file">{uploadCustomBtn}</label>
                <input
                    id="select_file"
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    onChange={handleFileInputChange}
                    className="hidden"
                />
            </div>
            <div className="mt-4 text-center">
                <button
                    type="button"
                    onClick={handleDeletePhoto}
                    className="px-2 py-1 mr-1 text-sm border rounded-md text-egBlack-semiLight border-egBlack-semiLight hover:bg-egGrey-light"
                >
                    삭제
                </button>
                <button
                    type="button"
                    onClick={handlePostPhoto}
                    className="px-2 py-1 text-sm border rounded-md text-egPurple-default border-egPurple-default hover:bg-egPurple-superLight"
                >
                    저장
                </button>
            </div>
        </div>
    );
};

export default ImageUploader;
