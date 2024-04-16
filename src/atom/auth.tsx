import { atom, selector } from 'recoil';

export const LoginAtom = atom({
    key: 'LoginAtom', // unique ID (with respect to other atoms/selectors)
    default: '',
});

export const LoginAtomSelector = selector({
    key: 'LoginAtomSelector',
    // get: 원본훼손X
    get: ({ get }) => {
        return get(LoginAtom);
    },
    // set: { set, get } 모두 사용할 수 있다.
    // 원본훼손 O
    // set(Aatom, newValue) // Aatom = newValue 이런식으로, 기존값 무시하고 재할당된다.
    set: ({ set, get }, newValue) => {
        if (newValue === 'admin' || newValue === 'user') {
            set(LoginAtom, newValue);
            // localStorage.setItem('token', newValue.refreshToken);
            // localStorage.setItem('token', newValue.accessToken);
            // localStorage.setItem('userProfile', newValue.userProfile);
        }
    },
});

// {
//     "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbl9pZCI6Imdzczo2MDdhZjBmMC05NDg2LTQzZTktYjdiZC0wMjUxMmNmZTQ0MzEiLCJzdWIiOiJnc3MtcmVmcmVzaC10b2tlbiIsImlhdCI6MTcxMzIzMTI5MSwiZXhwIjoxNzEzMzAzMjkxfQ.qCMlUshj0CdZz8qdZq9VGfY9Po0XKnxBdDirkfqtH7U",
//     "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbl9pZCI6Imdzczo2MDdhZjBmMC05NDg2LTQzZTktYjdiZC0wMjUxMmNmZTQ0MzEiLCJwcm9maWxlSWQiOiI2NjFkZDQ0M2JiN2NlYzFhN2Q1Y2U1MWUiLCJyb2xlIjoic3R1ZGVudCIsInNjb3BlIjpbImdzbSJdLCJsdiI6bnVsbCwic3ViIjoiZ3NtLWFjY2VzcyIsImlhdCI6MTcxMzIzMTI5MSwiZXhwIjoxNzEzMjM4NDkxfQ.GAv0h-z-aONvO4HAhc4UO-xF9L3_OM1y6KQO-MVZEjw",
//     "userProfile": {
//       "_id": "661dd443bb7cec1a7d5ce51e",
//       "isDeleted": false,
//       "deletedAt": null,
//       "authId": "661dd443bb7cec1a7d5ce51b",
//       "photo": "any-photo-url",
//       "currentRoundId": null,
//       "classGroupId": null,
//       "classGroupName": "",
//       "name": "차은우",
//       "name_token": "ㅊㅏㅇㅡㄴㅇㅜ",
//       "name_token_heads": "ㅊㅇㅇ",
//       "name_spaced": "차 은 우",
//       "name_token_spaced": "",
//       "phone": "010-5555-5678",
//       "phoneFather": "010-4321-5678",
//       "phoneMother": "010-1234-5678",
//       "residence": "경기도 성남시",
//       "birth": "1992-03-18T00:00:00.000Z",
//       "gender": "male",
//       "height": 182,
//       "weight": 68,
//       "pros": [
//         {
//           "_id": "661cc79a61f9c865cc4bbf21",
//           "name": "패스",
//           "category": "technical"
//         },
//         {
//           "_id": "661cc79a61f9c865cc4bbf22",
//           "name": "드리블",
//           "category": "technical"
//         },
//         {
//           "_id": "661cc79a61f9c865cc4bbf23",
//           "name": "위치선정",
//           "category": "technical"
//         },
//         {
//           "_id": "661cc79a61f9c865cc4bbf31",
//           "name": "시야",
//           "category": "mental"
//         },
//         {
//           "_id": "661cc79a61f9c865cc4bbf32",
//           "name": "대담함",
//           "category": "mental"
//         },
//         {
//           "_id": "661cc79a61f9c865cc4bbf33",
//           "name": "리더십",
//           "category": "mental"
//         },
//         {
//           "_id": "661cc79a61f9c865cc4bbf3c",
//           "name": "체력",
//           "category": "physical"
//         },
//         {
//           "_id": "661cc79a61f9c865cc4bbf3d",
//           "name": "스피드",
//           "category": "physical"
//         },
//         {
//           "_id": "661cc79a61f9c865cc4bbf3e",
//           "name": "몸싸움",
//           "category": "physical"
//         }
//       ],
//       "improvements": [
//         {
//           "_id": "661cc79a61f9c865cc4bbf24",
//           "name": "패널티킥",
//           "category": "technical"
//         },
//         {
//           "_id": "661cc79a61f9c865cc4bbf25",
//           "name": "코너킥",
//           "category": "technical"
//         },
//         {
//           "_id": "661cc79a61f9c865cc4bbf26",
//           "name": "퍼스트 터치",
//           "category": "technical"
//         },
//         {
//           "_id": "661cc79a61f9c865cc4bbf34",
//           "name": "승부욕",
//           "category": "mental"
//         },
//         {
//           "_id": "661cc79a61f9c865cc4bbf35",
//           "name": "예측력",
//           "category": "mental"
//         },
//         {
//           "_id": "661cc79a61f9c865cc4bbf36",
//           "name": "적극성",
//           "category": "mental"
//         },
//         {
//           "_id": "661cc79a61f9c865cc4bbf3f",
//           "name": "민첩성",
//           "category": "physical"
//         },
//         {
//           "_id": "661cc79a61f9c865cc4bbf40",
//           "name": "지구력",
//           "category": "physical"
//         },
//         {
//           "_id": "661cc79a61f9c865cc4bbf41",
//           "name": "균형감각",
//           "category": "physical"
//         }
//       ],
//       "team": "갤로핑",
//       "grade": "1~3학년",
//       "position": [],
//       "lessonExpire": null,
//       "soccerHistory": "없음",
//       "majorFoot": "오른발",
//       "marketingAgree": true,
//       "serviceAgree": true,
//       "createdAt": "2024-04-16T01:28:35.547Z",
//       "updatedAt": "2024-04-16T01:28:35.547Z",
//       "__v": 0
//     }
//   }
