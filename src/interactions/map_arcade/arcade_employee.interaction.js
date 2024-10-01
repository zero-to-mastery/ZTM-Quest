import { firstConversationArcade } from "../../constants";
import { displayDialogue } from "../../utils";

export const firstInteractionWithArcadeEmployee = (player, k, map) => {
    player.onCollide('arcade_employee', () => {
        player.isInDialog = true;
        displayDialogue(firstConversationArcade, () => {
            player.isInDialog = false;
            player.visitOneArcadeEmployee = true;
        });
    });
};