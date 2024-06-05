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
            setSelectedPhoto(event.target.files[0]);
        }
    };
    // 회원가입 하는 부분으로 아래 코드 넘김
    // const handlePostPhoto = () => {
    //     const data = new FormData();
    //     if (selectedPhoto && uploadedId) {
    //         data.append('id', uploadedId);
    //         data.append('photo', selectedPhoto);

    //         axios
    //             .post(`${process.env.REACT_APP_API_URL}/photo/${type}`, data, {
    //                 headers: {
    //                     'Content-Type': 'multipart/form-data',
    //                 },
    //             })
    //             .then((res) => console.log(res))
    //             .catch((err) => console.log(err));
    //     }
    // };
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
