export const EdadApropiadaMixin = (Clase) =>
  class extends Clase {
    constructor() {
      super();
      this.edadRecomendada();
    }

    edadRecomendada() {}
  };
