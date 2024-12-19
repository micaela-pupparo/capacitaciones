import { addBug, bugAdded } from "../bugs";
import { apiCallBegan } from "../api";

describe("bugsSlice", () => {
  describe("action creators", () => {
    // el problema aca es que en configureStore, en middleware tenemos la api. si lo comentamos, este test sigue pasando.
    // tambien si queremos testear lo que pasamos en middleware los test ya sabrian demasiado sobre la implementacion
    it("addBug", () => {
      const bug = { description: "a" };
      const result = addBug(bug);
      const expected = {
        type: apiCallBegan.type,
        payload: {
          url: "/bugs",
          method: "post",
          data: bug,
          onSuccess: bugAdded.type,
        },
      };

      expect(result).toEqual(expected);
    });
  });
});
