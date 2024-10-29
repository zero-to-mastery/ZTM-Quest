export const makeQuest = (name, description, objectives) => {
    const newQuest = {};
    const questDetails = { description, objectives, done: false };
    newQuest[name] = questDetails;
    return newQuest;
};
