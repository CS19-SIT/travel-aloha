const request = require("../../../request");

describe("Admin Hotel controller", () => {
  it("should GET /admin/hotel", async done => {
    const res = await request.get("/admin/hotel");

    expect(res.status).toBe(302); // redirect to login page
    done();
  });
});