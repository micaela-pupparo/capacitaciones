import { addBug } from "../bugs";
import configureStore from "../configureStore";

describe("bugsSlice", () => {
  describe("action creators", () => {
    // el problema aca es que en configureStore, en middleware tenemos la api. si lo comentamos, este test sigue pasando.
    // tambien si queremos testear lo que pasamos en middleware los test ya sabrian demasiado sobre la implementacion
    // it("addBug", () => {
    //   const bug = { description: "a" };
    //   const result = addBug(bug);
    //   const expected = {
    //     type: apiCallBegan.type,
    //     payload: {
    //       url: "/bugs",
    //       method: "post",
    //       data: bug,
    //       onSuccess: bugAdded.type,
    //     },
    //   };

    //   expect(result).toEqual(expected);
    // });

    // tira error porque se comunica con el backend. deja de ser una unit test y pasa a una integration test
    it("should handle the addBug action", async () => {
      // dispatch(addBug) => store
      //   ahora tenemos un store con todos los middlewares. no nos importan porque estamos testeando el comportamiento, no la implementacion
      const store = configureStore();
      const bug = { description: "a" };
      await store.dispatch(addBug(bug));

      expect(store.getState().entities.bugs.list).toHaveLength(1);
    });
  });
});
