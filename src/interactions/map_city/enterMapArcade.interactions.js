import { enterMap } from '../../core/kaplay/game/scene';

export const enterMapArcadeInteraction = (player, k) => {
    player.onCollide('enter_map_arcade', () => {
        enterMap('./scenes/arcade', 'arcade', 'spawn_office_left');
    });
};
