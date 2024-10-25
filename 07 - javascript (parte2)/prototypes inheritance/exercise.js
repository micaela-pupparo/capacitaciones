function HtmlElement() {
  this.click = function () {
    console.log("clicked");
  };
}

HtmlElement.prototype.focus = function () {
  console.log("focued");
};

function HtmlSelectElement(items = []) {
  this.items = items;

  this.addItem = function (item) {
    if (typeof item === "string") item = Number(item);

    if (!item || typeof item !== "number") throw new Error("Invalid item");

    this.items.push(item);
  };

  this.removeItem = function (item) {
    if (typeof item === "string") item = Number(item);

    if (!item || typeof item !== "number") throw new Error("Invalid item");

    this.items.slice(this.items.indexOf(item), 1);
  };

  this.render = function () {
    return `
    <select>${this.items
      .map(
        (item) => `
        <option>${item}</option>`
      )
      .join(" ")}
    </select>`;
    //es necesario el join para que junte todo con un espcio y no una coma
  };
}

//esta implementacion no hubiese funcionado
// HtmlSelectElement.prototype = Object.create(HtmlElement.prototype);
//porque object.create crearia un nuevo objeto y setearia su prototipo
//al prototipo de htmlelement
//este prototipo, llamemoslo baseHtmlElement tiene solo un metodo (focus)

//por lo que se debe hacer lo siguiente
HtmlSelectElement.prototype = new HtmlElement();
//esto crea un nuevo objeto de htmlelement que su prototipo es
//basehtmlelement, el cual tiene el metodo focus
//y el objeto creado tiene el metodo click
//por lo que creamos una instancia de htmlElement
HtmlSelectElement.prototype.constructor = HtmlSelectElement;

const e = new HtmlSelectElement();

function HtmlImageElement(src) {
  this.src = src;

  this.render = function () {
    return `<img src="${this.src}" />`;
  };
}

HtmlImageElement.prototype = new HtmlElement();
HtmlImageElement.prototype.constructor = HtmlImageElement;
