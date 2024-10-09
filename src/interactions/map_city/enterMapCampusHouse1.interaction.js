import { campusHouse1Scene } from '../../scenes/campus_house_1';

export const enterMapCampusHouse1Interaction = (player, k) => {
    player.onCollide('campus_house_door_1', () => {
        campusHouse1Scene({ k, enter_tag: 'spawn_bottom' });
    });
};
