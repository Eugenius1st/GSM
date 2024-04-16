import { atom, selector } from 'recoil';

export const RegistUserAtom = atom({
    key: 'RegistUserAtom', // unique ID (with respect to other atoms/selectors)
    default: '',
});

export const RegistUserAtomSelector = selector({
    key: 'RegistUserAtomSelector',
    get: ({ get }) => {
        return get(RegistUserAtom);
    },
    set: ({ set, get }, newValue) => {
        set(RegistUserAtom, newValue);
    },
});

// id: string;
// password: string;
// role: string;
// scope: string[];
// photo: string;
// name: string;
// phone: string;
// phoneFather: string;
// phoneMother: string;
// residence: string;
// birth: string;
// gender: string;
// height: number;
// weight: number;
// pros: TagType[]; // 장점
// improvements: TagType[];
// team: string;
// grade: string;
// soccerHistory: string;
// majorFoot: string;
