//esto rompe con el principio de abstraccion
//y ademas exponemos la propiedad duration a que pueda
//ser modificada

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
        },
        set: function(value) { duration = value }
    })
    Object.defineProperty(this, 'startTime', {
        get: function() {
            return startTime;
        }
    })
    Object.defineProperty(this, 'endTime', {
        get: function() {
            return endTime;
        }
    })
    Object.defineProperty(this, 'isCounting', {
        get: function() {
            return isCounting;
        }
    })
    
}

Watch.prototype.start = function() {
    if (this.isCounting)
        throw new Error('Clock is already counting');
    this.isCounting = true;
    this.startTime = Date.now();
};

Watch.prototype.stop = function() {
    if (!this.isCounting)
        throw new Error('Clock already stopped');
    this.isCounting = false;
    this.endTime = Date.now();

    const seconds = (this.duration = this.endTime - this.startTime) / 1000;
    this.duration+=seconds;
};

Watch.prototype.reset() =
    function() {
        this.duration = 0;
        this.isCounting = false;
        this.startTime = 0;
        this.endTime = 0;
    }


const clock = new Watch();
