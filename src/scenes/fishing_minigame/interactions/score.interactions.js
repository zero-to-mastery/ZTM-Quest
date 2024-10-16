export const interactionsWithScore = (scoreTitle, k, map) => {
    k.onUpdate('score', (gameObj) => {
        if (gameObj) {
            gameObj.text = `Score: ${map.score}`;
        }
    });
};
