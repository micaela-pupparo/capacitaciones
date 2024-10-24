function HtmlSelectElement(array = []) {
    let items = 0;

    Object.defineProperty(this, 'items', {
        get: function() {
            return items;
        }
    });

    this.addItem = function(item) {
        if (typeof item === 'string')
            item = Number(item);
        
        if (!item || typeof item !== 'number') 
            throw new Error('Invalid item')
        
        array.push(item);

        array.reduce((accumulator, current) => {
            accumulator+=current;
            return items = accumulator;
        }, 0);
        
    }
}

function HtmlElement() {
    this.click = function() { console.log('click') };
}

HtmlElement.prototype.focus = function() { console.log('focus') };

const e = new HtmlSelectElement();