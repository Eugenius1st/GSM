import { atom, selector } from 'recoil';

export const IsTabletAtom = atom({
    key: 'IsTabletAtom', // unique ID (with respect to other atoms/selectors)
    default: false,
});

export const IsTabletSelector = selector({
    key: 'IsTabletSelector',
    get: ({ get }) => {
        return get(IsTabletAtom);
    },
    set: ({ set, get }, newValue) => {
        set(IsTabletAtom, newValue);
    },
});
