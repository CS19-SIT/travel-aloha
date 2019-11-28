const request = require("../../request");

describe("Errors controller", () => {
  it("should return 404 page", async done => {
    const res = await request.get("/this-is-not-exist");

    expect(res.status).toBe(404);
    done();
  });
});
