// hooks
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// images
import userTempPhoto from 'assets/user/userTempPhoto.png';

interface RegisterImageUploaderType {
    type: string;
    uploadedId?: string;
    uploadCustomBtn?: React.ReactNode; // 커스텀 클래스 prop 추가
    previewImgStyle?: string; // 커스텀 클래스 prop 추가
    selectedPhoto?: File | null;
    setSelectedPhoto: (file: File | null) => void;
}

const RegisterImageUploader: React.FC<RegisterImageUploaderType> = ({
    type = 'admin',
    uploadedId, // 보통은 undefined로
    uploadCustomBtn,
    previewImgStyle,
    selectedPhoto,
    setSelectedPhoto,
}) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    useEffect(() => {
        if (!selectedPhoto) {
            setPreviewUrl(null);
            return;
        } else {
            // 미리보기
            const url = URL.createObjectURL(selectedPhoto);
            setPreviewUrl(url);
            return () => URL.revokeObjectURL(url);
        }
    }, [selectedPhoto]);

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
                setSelectedPhoto(file);
            }
        }
    };
    const handleClearPhoto = () => {
        setPreviewUrl(null);
        setSelectedPhoto(null);
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
                            alt="Preview"
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
        </div>
    );
};

export default RegisterImageUploader;
