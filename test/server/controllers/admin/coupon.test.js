const request = require('supertest');
const app = require("../../../../server/server");
const Coupon = require("../../../../server/models/coupon");
const querystring = require('querystring');

describe("Admin Coupon controller", () => {
  it("should disallow unauthorized access", async done => {
    return request(app)
      .get("/admin/coupon")
      .expect(302)
      .then(() => done());
  });

  describe("authorized access", () => {
    const agent = request.agent(app);
    let tracking = [];

    const gen = (len = 32) => {
      const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      var result = "";
      for (var i = len; i > 0; --i) {
        result += chars[Math.floor(Math.random() * chars.length)];
      }
      return result;
    }

    const controllerValid = obj => querystring.stringify({
      name: obj.code,
      discount_percentage: "1",
      start_date: "2019-11-29",
      expire_date: "2019-12-18",
      ...obj
    });

    const modelValid = obj => ({
      name: obj.code,
      discount_percentage: "1",
      start_date: "2019-11-29",
      expire_date: "2019-12-18",
      for_every_hotel: true,
      for_every_airline: true,
      ...obj
    });

    beforeAll(async () => {
      return agent
        .post("/login")
        .type('form')
        .send("username=coupontest")
        .send("password=coupontest")
        .expect(302);
    });

    afterAll(async () => {
      // cleanup coupons
      await Promise.all(tracking.map(Coupon.deleteCoupon));
      return agent.get("/logout");
    });

    it("should accessible", async done => {
      return agent
        .get("/admin/coupon")
        .expect(200)
        .then(() => done());
    });

    it("coupon should be added", async done => {
      const code = gen();

      return agent
        .put("/admin/coupon/new")
        .type('form')
        .send({
          code,
          name: code,
          description: "Goodbye",
          for_every_hotel: "off",
          for_every_airline: "off",
          levels: "silver",
          discount_percentage: "10",
          start_date: "2019-11-29",
          expire_date: "2019-12-18",
        })
        .expect(204)
        .then(() => {
          tracking.push(code);
          done();
        });
    });

    it("coupon should be removed", async done => {
      const code = tracking.pop();
      return agent
        .delete("/admin/coupon/delete/" + code)
        .expect(200)
        .then(() => done());
    })

    describe("coupon validation", () => {
      it("start_date < expire date", async done => {
        const code = gen();
        tracking.push(code);

        await agent.put("/admin/coupon/new")
          .type('form')
          .send(controllerValid({
            code,
            start_date: "2019-12-18",
            expire_date: "2019-11-29",
          })).expect(404);

        tracking.pop();
        done();
      });

      it("positive discount", async done => {
        const code = gen();
        tracking.push(code);

        await agent.put("/admin/coupon/new")
          .type('form')
          .send(controllerValid({
            code,
            discount_percentage: "-1",
          })).expect(404);

        tracking.pop();
        done();
      });

      it("max_count >= 0", async done => {
        const code = gen();
        tracking.push(code);

        await agent.put("/admin/coupon/new")
          .type('form')
          .send(controllerValid({
            code,
            max_count: "-1"
          })).expect(404);

        tracking.pop();
        done();
      });

      it("users must exist", async done => {
        const code = gen();
        tracking.push(code);

        await agent.put("/admin/coupon/new")
          .type('form')
          .send(controllerValid({
            code,
            users: ["coupontest", code]
          })).expect(404);

        tracking.pop();
        done();
      });

      it("coupon code length <= 50", async done => {
        const code = gen(51);
        tracking.push(code);

        await agent.put("/admin/coupon/new")
          .type('form')
          .send(controllerValid({
            code
          })).expect(404);

        tracking.pop();
        done();
      });

      it("hotels must exist", async done => {
        const code = gen();
        tracking.push(code);

        await agent.put("/admin/coupon/new")
          .type('form')
          .send(controllerValid({
            code,
            hotels: gen()
          })).expect(404);

        tracking.pop();
        done();
      });

      it("airlines must exist", async done => {
        const code = gen();
        tracking.push(code);

        await agent.put("/admin/coupon/new")
          .type('form')
          .send(controllerValid({
            code,
            airlines: gen()
          })).expect(404);

        tracking.pop();
        done();
      });
    });

    describe("pagination and search function", () => {
      beforeAll(async () => {
        for (let i = 0; i < 30; i++) {
          const code = gen();
          await Coupon.createCoupon(modelValid({code}));
          tracking.push(code);
        }
      });

      it("should show all coupons we inserted", async done => {
        let left = [...tracking];
        let page = 0;

        while (left.length > 0) {
          let res = await agent
            .get("/admin/coupon/" + page)
            .expect(200);

          for (let i = 0; i < left.length;) {
            if (res.text.indexOf(left[i]) > 0) {
              left.splice(i, 1);
            } else {
              i++;
            }
          }

          page++;
        }
        
        done();
      });
    });
  });
});
