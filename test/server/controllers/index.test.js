const request = require("../../request");

describe("Index controller", () => {
  it("should GET /", async done => {
    const res = await request.get("/");

    expect(res.status).toBe(200);
    done();
  });
});