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
        const response = await axios
            .post(`${process.env.REACT_APP_API_URL}${requestUrl}`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                console.log('POST 요청 되었습니다', response.data);
                if (successFunc) successFunc(response.data);
                if (flagCheckFunc) flagCheckFunc(true);
            });
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

// DELETE 요청을 보낼 함수 정의
export interface RegistDeleteType {
    requestUrl: string;
    data?: any;
    successFunc?: (data: any) => void;
    flagCheckFunc?: (data: boolean) => void;
}
export async function requestDelete({ requestUrl, data, successFunc, flagCheckFunc }: RegistDeleteType) {
    try {
        const response = await axios.delete(`${requestUrl}`, { data: data });
        console.log('DELETE 요청 되었습니다', response.data);
        if (successFunc) successFunc(response.status);
        if (flagCheckFunc) flagCheckFunc(true);
        // 성공적으로 삭제되었을 때 추가적인 작업을 수행할 수 있습니다.
    } catch (error: any) {
        if (error.response) {
            // 요청은 성공했지만 서버에서 오류 응답을 보낸 경우
            console.error('서버 오류:', error.response.data);
            console.error('응답 상태 코드:', error.response.status);
        } else if (error.request) {
            // 요청이 전송되었지만 응답을 받지 못한 경우
            console.error('응답을 받지 못했습니다:', error.request);
        } else {
            // 요청을 설정하는 중에 오류가 발생한 경우
            console.error('오류 발생:', error.message);
        }
        console.error('요청 설정:', error.config);
    }
}
