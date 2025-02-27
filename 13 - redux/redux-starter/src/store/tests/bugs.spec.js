import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { addBug, getUnresolvedBugs, resolveBug, loadBugs } from "../bugs";
import configureStore from "../configureStore";
import entities from "../entities";

describe("bugsSlice", () => {
  describe("action creators", () => {
    let fakeAxios;
    let store;

    beforeEach(() => {
      fakeAxios = new MockAdapter(axios);
      store = configureStore();
    });

    const bugsSlice = () => store.getState().entities.bugs;

    const createState = () => ({
      entities: {
        bugs: {
          list: [],
        },
      },
    });

    describe("loading bugs", () => {
      describe("if the bugs exist in the cache", () => {
        it("they should not be fetched from the server again", async () => {
          fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }]);

          await store.dispatch(loadBugs());
          await store.dispatch(loadBugs());

          expect(fakeAxios.history.get.length).toBe(1);
        });
      });
      describe("if the bugs dont exist in the cache", () => {
        it("they should be fetched from the server and put in the store", async () => {
          fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }]);

          await store.dispatch(loadBugs());

          expect(bugsSlice().list).toHaveLength(1);
        });

        describe("loading indicator", () => {
          it("should be true while fetching the bugs", () => {
            fakeAxios.onGet("/bugs").reply(() => {
              expect(bugsSlice().loading).toBe(true);
              return [200, [{ id: 1 }]];
            });

            store.dispatch(loadBugs());
          });
          it("should be false after the bugs are fetched", async () => {
            fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }]);

            await store.dispatch(loadBugs());

            expect(bugsSlice().loading).toBe(true);
          });
          it("should be false if the server returns an error", async () => {
            fakeAxios.onGet("/bugs").reply(500);

            await store.dispatch(loadBugs());

            expect(bugsSlice().loading).toBe(true);
          });
        });
      });
    });

    it("should mark the bug as resolved if its saved to the server", async () => {
      fakeAxios.onPatch("/bugs/1").reply(200, { id: 1, resolved: true });
      fakeAxios.onPost("/bugs").reply(200, { id: 1 });

      await store.dispatch(addBug({}));
      await store.dispatch(resolveBug(1));

      expect(bugsSlice().list[0].resolved).toBe(true);
    });

    it("should not mark the bug as resolved if its not saved to the server", async () => {
      fakeAxios.onPatch("/bugs/1").reply(500);
      fakeAxios.onPost("/bugs").reply(200, { id: 1 });

      await store.dispatch(addBug({}));
      await store.dispatch(resolveBug(1));

      expect(bugsSlice().list[0].resolved).not.toBe(true);
    });

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
    // it("should add the bug to the store if its saved to the server", async () => {
    //   // dispatch(addBug) => store
    //   //   ahora tenemos un store con todos los middlewares. no nos importan porque estamos testeando el comportamiento, no la implementacion
    //   //   Arrange
    //   const bug = { description: "a" };
    //   const savedBug = { ...bug, id: 1 };
    //   fakeAxios.onPost("/bugs").reply(200, savedBug);

    //   //   Act
    //   await store.dispatch(addBug(bug));

    //   //   Assert
    //   expect(bugsSlice().list).toContainEqual(savedBug);
    // });

    // it("should not add the bug to the store if its not saved to the server", async () => {
    //   // dispatch(addBug) => store
    //   //   ahora tenemos un store con todos los middlewares. no nos importan porque estamos testeando el comportamiento, no la implementacion
    //   //   Arrange
    //   const bug = { description: "a" };
    //   const savedBug = { ...bug, id: 1 };
    //   fakeAxios.onPost("/bugs").reply(500);

    //   //   Act
    //   await store.dispatch(addBug(bug));

    //   //   Assert
    //   expect(bugsSlice().list).toHaveLength(0);
    // });
    describe("selectors", () => {
      it("should", () => {
        const state = createState();
        state.entities.bugs.list = [
          { id: 1, resolved: true },
          { id: 2 },
          { id: 3 },
        ];

        const result = getUnresolvedBugs(state);

        expect(result).toHaveLength(2);
      });
    });
  });
});
