export const updateEnergyState = (state, val) => {
    state.energy += val;
    if (state.energy > 100) {
        state.energy = 100;
    }
    updateEnergyUI(state.energy);
};

export const updateEnergyUI = (energy) => {
    const barWidth = 100;
    const energyRemain = document.getElementById('energy-bar-remain');
    energyRemain.style.width = `${(energy * barWidth) / 100}px`;
};
