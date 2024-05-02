//  base-64
import base64 from 'base-64';

export interface DecodeType {
    token: string;
}
export function decode(token: string) {
    let payload = token && token.substring(token.indexOf('.') + 1, token.lastIndexOf('.'));
    let decodingInfo = payload && base64.decode(payload);
    // return decodingInfo;
    if (decodingInfo) return JSON.parse(decodingInfo);
}
