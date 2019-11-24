const request = require("../../../request");

describe("Auth controller", () => {
  describe("Index", () => {
    it("should GET /login", async done => {
      const res = await request.get("/login");

      expect(res.status).toBe(200);
      done();
    });

    it("should GET /register", async done => {
      const res = await request.get("/register");

      expect(res.status).toBe(200);
      done();
    });
  });
});
