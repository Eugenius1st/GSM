import axios from 'axios';

// GET 요청할 데이터 타입 정의
export interface RegistGetType {
    requestUrl: string;
    successFunc?: (data: any) => void;
    flagCheckFunc?: (data: boolean) => void;
}
// GET 요청을 보낼 함수 정의
export async function requestGet({ requestUrl, successFunc, flagCheckFunc }: RegistGetType) {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}${requestUrl}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('GET 요청 되었습니다', response.data);
        if (successFunc) successFunc(response.data);
        if (flagCheckFunc) flagCheckFunc(true);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            if (successFunc) successFunc(false);
            // 요청이 전송되었고, 서버는 2xx 외의 상태 코드로 응답했습니다.
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

// POST 요청을 보낼 함수 정의
export async function requestPost({ requestUrl, data, successFunc, flagCheckFunc }: any) {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}${requestUrl}`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('POST 요청 되었습니다', response.data);
        if (successFunc) successFunc(response.data);
        if (flagCheckFunc) flagCheckFunc(true);
    } catch (error: any) {
        if (error.response) {
            console.log('문제', error.response.data);
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
