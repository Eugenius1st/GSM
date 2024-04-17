import { atom, selector } from 'recoil';

// 회원 정보저장
export const LoginAtom = atom<any>({
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
        if (newValue) {
            set(LoginAtom, newValue);
            localStorage.setItem('loginAtom', JSON.stringify(newValue));
        }
    },
});

// admin, user 로그인 상태 구분
export const LoginState = atom<any>({
    key: 'LoginState', // unique ID (with respect to other atoms/selectors)
    default: '',
});
export const LoginStateSelector = selector({
    key: 'LoginStateSelector',
    get: ({ get }) => {
        return get(LoginState);
    },
    set: ({ set, get }, newValue) => {
        if (newValue) {
            set(LoginState, newValue);
            localStorage.setItem('state', newValue);
        }
    },
});
