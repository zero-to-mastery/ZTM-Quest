import { arcadeScene } from '../../scenes/arcade';

export const enterMapArcadeInteraction = (player, k) => {
    player.onCollide('enter_map_arcade', () => {
        arcadeScene({ k, enter_tag: 'spawn_office_left' });
    });
};
