import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const userData = {
    id: 'user11',
    password: 'pass1234!',
    role: 'student',
    scope: [],
    photo: 'any-photo-url',
    name: '차은우',
    phone: '010-5555-5678',
    phoneFather: '010-4321-5678',
    phoneMother: '010-1234-5678',
    residence: '경기도 성남시',
    birth: '1992-03-18T00:00:00.000Z',
    gender: 'male',
    height: 182,
    weight: 68,
    pros: [
        {
            category: 'tech',
            name: 'pass',
        },
    ],
    improvements: [
        {
            category: 'mental',
            name: 'sight',
        },
    ],
    team: '갤로핑',
    grade: '1~3학년',
    soccerHistory: '없음',
    majorFoot: '오른발',
};

export const createUser = async () => {
    const response = await axios.post('/api/users', userData);
    return response.data;
};

interface TagType {
    category: string;
    name: string;
}

interface SignUpData {
    id: string;
    password: string;
    role: string;
    scope: string[];
    photo: string;
    name: string;
    phone: string;
    phoneFather: string;
    phoneMother: string;
    residence: string;
    birth: string;
    gender: string;
    height: number;
    weight: number;
    pros: TagType[]; // 장점
    improvements: TagType[];
    team: string;
    grade: string;
    soccerHistory: string;
    majorFoot: string;
}

// {
//     "id": "user11",
//     "password": "pass1234!",
//     "role": "student",
//     "scope": [
//       "gsm"
//     ],
//     "photo": "any-photo-url",
//     "name": "차은우",
//     "phone": "010-5555-5678",
//     "phoneFather": "010-4321-5678",
//     "phoneMother": "010-1234-5678",
//     "residence": "경기도 성남시",
//     "birth": "1992-03-18T00:00:00.000Z",
//     "gender": "male",
//     "height": 182,
//     "weight": 68,
//     "pros": [
//       {
//         "category": "tech",
//         "name": "pass"
//       }
//     ],
//     "improvements": [
//       {
//         "category": "mental",
//         "name": "sight"
//       }
//     ],
//     "team": "갤로핑",
//     "grade": "1~3학년",
//     "soccerHistory": "없음",
//     "majorFoot": "오른발"
//   }'
