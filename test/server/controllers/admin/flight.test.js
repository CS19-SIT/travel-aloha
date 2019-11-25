const request = require("../../../request");

describe("Admin Flight controller", () => {
  it("should GET /admin/flight", async done => {
    const res = await request.get("/admin/flight");

    expect(res.status).toBe(302); // redirect to login page
    done();
  });
});