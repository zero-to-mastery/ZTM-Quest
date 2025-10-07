import { displayPermissionBox, displayDialogue } from '../../utils';

export const backpackInteractions = (player, k, map) => {
    player.onCollide('backpack', async (backpack) => {
        const wantBackpack = await displayPermissionBox({
            k,
            player,
            text: [
                'Got a lot to carry? No problem—grab a backpack and load up.',
            ],
        });

        const dialog = [];

        if (wantBackpack) {
            player.state.backpack = [];
            k.destroy(backpack);
            dialog.push('Aye, a trusty pack for a worthy traveler.');
        } else {
            dialog.push('Oh, going minimalist this time? Bold choice.');
        }

        displayDialogue({
            k,
            player,
            text: [dialog.join(' ')],
        });
    });
};
