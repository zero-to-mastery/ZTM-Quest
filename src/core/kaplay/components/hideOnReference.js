export const hideOnReference = (opt) => {
    const distance = opt.distance ?? 200;
    let isOut = false;
    let referenceGameObj = opt.referenceGameObj ?? null;

    return {
        id: 'hideOnReference',
        require: ['pos'],
        isOutOfReferenceObjeectArea() {
            const pos = this.worldPos();

            // This is not possible, screenPos() without arguments returns the pos
            if (!pos || !referenceGameObj) return false;

            return Math.abs(referenceGameObj.worldPos().x - pos.x) > distance;
        },
        onExitReferenceObjectArea(action) {
            return this.on('exitReferenceObjectArea', action);
        },
        onEnterReferenceObjectArea(action) {
            return this.on('enterReferenceObjectArea', action);
        },
        add() {
            if (referenceGameObj) {
                referenceGameObj.onUpdate(() => {
                    if (!this.isOutOfReferenceObjeectArea()) {
                        this.trigger('update');
                    }
                });
            }
        },
        update() {
            if (this.isOutOfReferenceObjeectArea()) {
                if (!isOut) {
                    this.trigger('exitReferenceObjectArea');
                    isOut = true;
                }
                if (opt.hide) this.hidden = true;
                if (opt.pause) this.paused = true;
                if (opt.destroy) this.destroy();
            } else {
                if (isOut) {
                    this.trigger('enterReferenceObjectArea');
                    isOut = false;
                }
                if (opt.hide) this.hidden = false;
                if (opt.pause) this.paused = false;
            }
        },
    };
};
