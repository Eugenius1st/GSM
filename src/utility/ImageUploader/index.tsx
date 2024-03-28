// hooks
import React, { useState, useEffect } from 'react';

interface ImageUploaderType {
    uploadCustomBtn?: React.ReactNode; // 커스텀 클래스 prop 추가
    previewImgStyle?: string; // 커스텀 클래스 prop 추가
    previewBeforeIcon?: React.ReactNode;
}

const ImageUploader: React.FC<ImageUploaderType> = ({ uploadCustomBtn, previewImgStyle, previewBeforeIcon }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        if (!selectedFile) {
            setPreviewUrl(null);
            return;
        }

        const url = URL.createObjectURL(selectedFile);
        setPreviewUrl(url);

        return () => URL.revokeObjectURL(url);
    }, [selectedFile]);

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    return (
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
                <div>{previewBeforeIcon}</div>
            )}

            <label htmlFor="select_file">{uploadCustomBtn}</label>
            <input
                id="select_file"
                type="file"
                onChange={handleFileInputChange}
                className="hidden"
            />
        </div>
    );
};

export default ImageUploader;
