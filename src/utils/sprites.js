import { characters } from '../constants';

export const getRandomCharacter = () => {
    const n = Math.floor(Math.random() * characters.length);
    return characters[n];
};
