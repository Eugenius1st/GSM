import heic2any from 'heic2any';

// HEIC 파일을 JPEG로 변환하는 함수
const convertHeicToJpeg = async (inputFile: File): Promise<Blob | null> => {
    try {
        // HEIC 파일을 ArrayBuffer로 변환
        const arrayBuffer = await inputFile.arrayBuffer();

        // ArrayBuffer를 Blob으로 변환
        const blob = new Blob([arrayBuffer]);

        // heic2any를 사용하여 Blob을 JPEG로 변환
        const jpegBlobOrBlobs = await heic2any({ blob });

        // 반환값이 배열 형태인 경우, 첫 번째 Blob 객체를 사용
        const jpegBlob = Array.isArray(jpegBlobOrBlobs) ? jpegBlobOrBlobs[0] : jpegBlobOrBlobs;

        return jpegBlob;
    } catch (error) {
        console.error('HEIC 파일을 JPEG로 변환하는 중 오류 발생:', error);
        return null;
    }
};

export default convertHeicToJpeg;
