import { atom, selector } from 'recoil';

export const IsMobileAtom = atom({
    key: 'IsMobileAtom', // unique ID (with respect to other atoms/selectors)
    default: false,
});

export const IsMobileSelector = selector({
    key: 'IsMobileSelector',
    get: ({ get }) => {
        return get(IsMobileAtom);
    },
    set: ({ set, get }, newValue) => {
        set(IsMobileAtom, newValue);
    },
});
