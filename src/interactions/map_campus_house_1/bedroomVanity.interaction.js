import { displayDialogue } from '../../utils';
import { updateEnergyState } from '../../utils/energyUpdate';

const bedroomVanityDialog = [
  `
    <div>
        <h2>Mirror, mirror, on the wall...</h2>
        <p>
            Who's the best developer of them all?
        </p>
        <p>
            It's you!
        </p>
    </div>
`,
];

export const bedroomVanityInteractions = (player, k, map) => {
  player.onCollide('bedroom_vanity', () => {
    player.isInDialog = true;
    displayDialogue({
      k,
      player,
      text: bedroomVanityDialog,
      onDisplayEnd: () => {
        player.isInDialog = false;
      },
    });
    updateEnergyState(player.state, (player.state.energy + 10));
  })
}