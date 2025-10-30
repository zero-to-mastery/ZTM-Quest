import { time } from '../../kplayCtx';
import { characters } from '../../constants';
import { changePlayerSprite } from '../../utils/changePlayer';
import { showCustomPrompt } from '../../utils';

let abort;

/**
 * Show paginated character list (5 per page)
 */
const showCharacterList = async (player, k, page = 0) => {
    const characterOptions = characters.map(
        (character) =>
            character.name.charAt(0).toUpperCase() + character.name.slice(1)
    );

    const itemsPerPage = 5;
    const totalPages = Math.ceil(characterOptions.length / itemsPerPage);
    const startIndex = page * itemsPerPage;
    const endIndex = Math.min(
        startIndex + itemsPerPage,
        characterOptions.length
    );
    const currentCharacters = characterOptions.slice(startIndex, endIndex);

    const message = `<strong>Character Selection (Page ${page + 1}/${totalPages})</strong>`;

    // Create options for characters on this page
    const options = currentCharacters.map((characterName, index) => {
        const actualIndex = startIndex + index;
        return {
            value: actualIndex,
            text: characterName,
        };
    });

    // Add navigation buttons
    if (page > 0) {
        options.push({
            value: 'prev',
            text: '← Previous',
        });
    }

    if (page < totalPages - 1) {
        options.push({
            value: 'next',
            text: 'Next →',
        });
    }

    options.push({
        value: 'close',
        text: '✕ Close',
    });

    showCustomPrompt(
        message,
        options,
        async (selectedValue) => {
            if (selectedValue === 'prev' || selectedValue === 'next') {
                // Reopen immediately for navigation
                setTimeout(async () => {
                    player.state.isInDialog = true;
                    time.paused = true;

                    if (selectedValue === 'prev') {
                        await showCharacterList(player, k, page - 1);
                    } else if (selectedValue === 'next') {
                        await showCharacterList(player, k, page + 1);
                    }
                }, 50);
            } else if (typeof selectedValue === 'number') {
                const selectedCharacter = characters[selectedValue];
                changePlayerSprite(
                    selectedCharacter.name,
                    player.curAnim(),
                    k,
                    player
                );
            }
        },
        player,
        k,
        abort
    );
};

export const interactionWithLocker = (player, k, map) => {
    player.onCollide('cabin_edge_room_1', async () => {
        player.vel = k.vec2(0, 0);

        time.paused = true;
        player.state.isInDialog = true;
        abort = new AbortController();

        await new Promise((resolve) => setTimeout(resolve, 300));

        await showCharacterList(player, k);
    });
};
