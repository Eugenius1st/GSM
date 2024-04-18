//  base-64
import base64 from 'base-64';

export interface DecodeType {
    token: string;
}
export function decode(token: string) {
    console.log('decode 호출');
    let payload = token && token.substring(token.indexOf('.') + 1, token.lastIndexOf('.'));
    let decodingInfo = payload && base64.decode(payload);
    // console.log('decodingInfo', decodingInfo);
    // return decodingInfo;
    if (decodingInfo) return JSON.parse(decodingInfo);
}
