function Watch() {
    let startTime = 0;
    let endTime = 0;
    let isCounting = false;
    let duration = 0;
    
    Object.defineProperty(this, 'duration', {
        get: function() {
            if (!endTime && startTime) {
                const currentTime = Date.now();
                return (currentTime - startTime) / 1000;
            }
            return duration;
        }
    })

    this.start = function() {
        if (isCounting)
            throw new Error('Clock is already counting');
        isCounting = true;
        startTime = Date.now();
    }
    this.stop = function() {
        if (!isCounting)
            throw new Error('Clock already stopped');
        isCounting = false;
        endTime = Date.now();

        const seconds = (duration = endTime - startTime) / 1000;
        duration+=seconds;
    }
    this.reset = function() {
        duration = 0;
        isCounting = false;
        startTime = 0;
        endTime = 0;
    }
}

const clock = new Watch();
