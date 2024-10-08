import { enterMap } from '../../core/kaplay/game/scene';

export const enterMapCampusHouse1Interaction = (player, k) => {
    player.onCollide('campus_house_door_1', () => {
        enterMap('./scenes/campus_house_1', 'campus_house_1');
    });
};
