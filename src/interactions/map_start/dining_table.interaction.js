import { time } from '../../kplayCtx';
import { displayDialogue, showCustomPrompt } from '../../utils';
import { purchaseItem } from '../../utils/coinsUpdate';

let abort;

export const interactionWithDiningTable = (player, k, map) => {
    const handleTableInteraction = () => {
        time.paused = true;
        player.state.isInDialog = true;
        abort = new AbortController();

        showCustomPrompt(
            'Welcome to the Dining Table! What would you like to eat?',
            [
                'Pizza Slice (15 coins)',
                'Sandwich (12 coins)',
                'Salad (10 coins)',
                'Pasta (18 coins)',
                'Nothing, thanks',
            ],
            (selectedOption) => {
                const foodData = {
                    'Pizza Slice (15 coins)': {
                        text: [
                            'Mmm! Delicious pizza slice! The cheese is perfectly melted.',
                        ],
                        cost: 15,
                        energy: 35,
                    },
                    'Sandwich (12 coins)': {
                        text: [
                            'A fresh sandwich with crispy lettuce and juicy tomatoes. Yum!',
                        ],
                        cost: 12,
                        energy: 28,
                    },
                    'Salad (10 coins)': {
                        text: [
                            'A healthy salad! You feel refreshed and energized.',
                        ],
                        cost: 10,
                        energy: 22,
                    },
                    'Pasta (18 coins)': {
                        text: [
                            'Delicious pasta with rich tomato sauce! That hit the spot!',
                        ],
                        cost: 18,
                        energy: 40,
                    },
                    'Nothing, thanks': {
                        text: ["Maybe next time when you're hungry!"],
                        cost: 0,
                        energy: 0,
                    },
                };

                const selectedFood = foodData[selectedOption];

                displayDialogue({
                    k,
                    player,
                    text: selectedFood.text,
                    onDisplayEnd: () => {
                        if (selectedFood.cost > 0) {
                            purchaseItem(
                                k,
                                selectedFood.cost,
                                selectedFood.energy
                            );
                        }
                    },
                });
            },
            player,
            k,
            abort
        );
    };

    player.onCollide('table_mainArea', handleTableInteraction);
    player.onCollide('table_room_1', handleTableInteraction);
    player.onCollide('table_lobby', handleTableInteraction);
};
