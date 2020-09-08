import { Stuff } from '../models/Stuff';

export const getStuff = (limit = 10) => {
    const Stuffs = [];
    for (let i = 0; i < limit; ++i) {
        Stuffs.push(new Stuff());
    }
    return Stuffs;
};
