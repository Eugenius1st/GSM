import axios from 'axios';

export interface PostLoginType {
    requestUrl: string;
    id: string;
    pw: string;
    successFunc: any;
}
export async function loginPost({ requestUrl, id, pw, successFunc }: PostLoginType) {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}${requestUrl}`,
            { id: id, password: pw },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log('로그인 되었습니다');
        console.log(response);
        if (successFunc) successFunc(response.data);
    } catch (error: any) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // 요청이 전송되었지만, 응답이 수신되지 않았습니다.
            console.log(error.request);
        } else {
            // 오류가 발생한 요청을 설정하는 동안 문제가 발생했습니다.
            console.log('Error', error.message);
        }
        console.log(error.config);
    }
}
// 요청할 데이터 타입 정의
export interface RegistPostType {
    requestUrl: string;
    requestBody: RequestBodyType;
    successFunc?: (data: any) => void;
}

export interface RequestBodyType {
    id: string;
    password: string;
    role: string;
    scope: string[];
    photo: string;
    name: string;
    gender: string;
    birth: string;
    lv: number;
    mobile: string;
    duty: string;
    license: string[];
}
