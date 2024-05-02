import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

// admin, user token 저장
let { persistAtom } = recoilPersist({ storage: localStorage }); // ✔
// 자동 로그인 atom
export const AutoLogin = atom<boolean>({
    key: 'autoLogin', // unique ID (with respect to other atoms/selectors)
    default: false,
});

export const AutoLoginSelector = selector({
    key: 'AutoLoginSelector',
    // get: 원본훼손X
    get: ({ get }) => {
        return get(AutoLogin);
    },

    set: ({ set }, newValue) => {
        set(AutoLogin, newValue);
    },
});

// user 정보 atom
export const LoginAtom = atom<any>({
    key: 'LoginAtom', // unique ID (with respect to other atoms/selectors)
    default: 'initial',
    effects_UNSTABLE: [persistAtom], // ✔
});

export const LoginAtomSelector = selector({
    key: 'LoginAtomSelector',
    // get: 원본훼손X s
    get: ({ get }) => {
        return get(LoginAtom);
    },
    // set: { set, get } 모두 사용할 수 있다.
    // 원본훼손 O
    // set(Aatom, newValue) // atom = newValue 이런식으로, 기존값 무시하고 재할당된다.
    set: ({ set }, newValue) => {
        if (newValue) {
            set(LoginAtom, newValue);
            // localStorage.setItem('loginAtom', JSON.stringify(newValue));
        }
    },
});

// admin, user 로그인 상태 구분
export const LoginState = atom<any>({
    key: 'LoginState', // unique ID (with respect to other atoms/selectors)
    default: 'initial',
    effects_UNSTABLE: [persistAtom], // ✔
});
export const LoginStateSelector = selector({
    key: 'LoginStateSelector',
    get: ({ get }) => {
        return get(LoginState);
    },
    set: ({ set }, newValue) => {
        if (newValue) {
            set(LoginState, newValue);
            // localStorage.setItem('state', newValue);
        }
    },
});
