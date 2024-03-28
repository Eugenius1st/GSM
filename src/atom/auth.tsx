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
        }
    },
});
