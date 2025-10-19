import { movingCars } from './movingCars';
import { flyingBirds } from './flyingBirds';
import { npcsInCityMap } from './npcsOnmap_city';
import { soccerBall } from './soccerBall.gameObject';
import { americanFootball } from './americanFootball.gameObject';
import { jessica } from './jessica.gameObject';

const gameObjects = [
    npcsInCityMap,
    // Add more game objects here
    movingCars,
    flyingBirds,
    soccerBall,
    americanFootball,
    jessica,
];

export default gameObjects;
