import { atom, selector } from 'recoil';

export const RegistAdminAtom = atom({
    key: 'RegistAdminAtom', // unique ID (with respect to other atoms/selectors)
    default: '',
});

export const RegistAdminAtomSelector = selector({
    key: 'RegistAdminAtomSelector',
    get: ({ get }) => {
        return get(RegistAdminAtom);
    },
    set: ({ set, get }, newValue) => {
        set(RegistAdminAtom, newValue);
    },
});
