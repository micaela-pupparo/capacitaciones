import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { addBug } from "../bugs";
import configureStore from "../configureStore";

describe("bugsSlice", () => {
  describe("action creators", () => {
    let fakeAxios;
    let store;

    beforeEach(() => {
      fakeAxios = new MockAdapter(axios);
      store = configureStore();
    });

    const bugsSlice = () => store.getState().entities.bugs;
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
    it("should add the bug to the store if its saved to the server", async () => {
      // dispatch(addBug) => store
      //   ahora tenemos un store con todos los middlewares. no nos importan porque estamos testeando el comportamiento, no la implementacion
      //   Arrange
      const bug = { description: "a" };
      const savedBug = { ...bug, id: 1 };
      fakeAxios.onPost("/bugs").reply(200, savedBug);

      //   Act
      await store.dispatch(addBug(bug));

      //   Assert
      expect(bugsSlice().list).toContainEqual(savedBug);
    });

    it("should not add the bug to the store if its not saved to the server", async () => {
      // dispatch(addBug) => store
      //   ahora tenemos un store con todos los middlewares. no nos importan porque estamos testeando el comportamiento, no la implementacion
      //   Arrange
      const bug = { description: "a" };
      const savedBug = { ...bug, id: 1 };
      fakeAxios.onPost("/bugs").reply(500);

      //   Act
      await store.dispatch(addBug(bug));

      //   Assert
      expect(bugsSlice().list).toHaveLength(0);
    });
  });
});
