import { atom, selector } from 'recoil';

// 1단계 정보 저장
export const TermsAgreeAtom = atom({
    key: 'TermsAgreeAtom', // unique ID (with respect to other atoms/selectors)
    default: '',
});

export const TermsAgreeAtomSelector = selector({
    key: 'TermsAgreeAtomSelector',
    get: ({ get }) => {
        return get(TermsAgreeAtom);
    },
    set: ({ set, get }, newValue) => {
        set(TermsAgreeAtom, newValue);
    },
});

export const BasicInfoAtom = atom({
    key: 'BasicInfoAtom', // unique ID (with respect to other atoms/selectors)
    default: '',
});

// 2단계 정보 저장
export const BasicInfoAtomSelector = selector({
    key: 'BasicInfoAtomSelector',
    get: ({ get }) => {
        return get(BasicInfoAtom);
    },
    set: ({ set, get }, newValue) => {
        set(BasicInfoAtom, newValue);
    },
});

// 3단계 정보 저장
export const AdditionalInfoAtom = atom({
    key: 'AdditionalInfoAtom', // unique ID (with respect to other atoms/selectors)
    default: '',
});

export const AdditionalInfoAtomSelector = selector({
    key: 'AdditionalInfoAtomSelector',
    get: ({ get }) => {
        return get(AdditionalInfoAtom);
    },
    set: ({ set, get }, newValue) => {
        set(AdditionalInfoAtom, newValue);
    },
});

// 4단계 정보 저장
export const ResearchInfoAtom = atom({
    key: 'ResearchInfoAtom', // unique ID (with respect to other atoms/selectors)
    default: '',
});

export const ResearchInfoAtomSelector = selector({
    key: 'ResearchInfoAtomSelector',
    get: ({ get }) => {
        return get(ResearchInfoAtom);
    },
    set: ({ set, get }, newValue) => {
        set(ResearchInfoAtom, newValue);
    },
});
