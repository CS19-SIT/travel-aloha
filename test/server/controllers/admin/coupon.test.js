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

    const clean = async arr => {
      return Promise.all(arr.map(code => Coupon.deleteCoupon(code, false)));
    }

    const find = async (codes, excludes = [], getPage) => {
      if (getPage == null) {
        getPage = async page => {
          return agent
            .get("/admin/coupon/" + page);
        };
      }

      let left = [...codes];
      let page = 0;

      while (left.length > 0 || excludes.length > 0) {
        let res = await getPage(page);

        if (!res.ok) {
          break;
        }

        for (let i = 0; i < left.length;) {
          if (res.text.indexOf(left[i]) > 0) {
            left.splice(i, 1);
          } else {
            i++;
          }
        }

        for (let i = 0; i < excludes.length; i++) {
          if (res.text.indexOf(excludes[i]) > 0) {
            throw new Error("an exclude coupon presented");
          }
        }

        page++;
      }

      // shouldn't happen, as it finds though the last page, the next page will
      // 404 and error early in the request operation.
      if (left.length > 0) {
        throw new Error("missing coupon");
      }
    }

    beforeAll(async () => {
      return agent
        .post("/login")
        .type('form')
        .send("username=coupontest")
        .send("password=coupontest")
        .expect(302);
    });

    afterAll(async () => {
      await clean(tracking);
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

    it("coupon should be edited", async done => {
      const oldCode = tracking[tracking.length - 1];
      const newCode = oldCode + "a";
      
      await agent
        .post(`/admin/coupon/edit/${oldCode}`)
        .type('form')
        .send({
          code: newCode,
          name: oldCode,
          description: "Goodbye 2",
          for_every_hotel: "on",
          for_every_airline: "off",
          discount_percentage: "12",
          start_date: "2018-11-29",
          expire_date: "2018-12-18",
        })
        .expect(204);
      
      const coupon = await Coupon.getCoupon(newCode);

      expect(coupon.code).toBe(newCode);
      tracking[tracking.length - 1] = newCode;

      expect(coupon).toMatchObject({
        name: oldCode,
        description: "Goodbye 2",
        for_every_hotel: true,
        for_every_airline: false,
        start_date: new Date("2018-11-29T00:00:00+07:00"),
        expire_date: new Date("2018-12-18T00:00:00+07:00")
      });

      expect(parseInt(coupon.discount_percentage)).toBe(12);

      done();
    })

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

    describe("pagination", () => {
      let tracking = [];

      beforeAll(async () => {
        for (let i = 0; i < 30; i++) {
          const code = gen();
          await Coupon.createCoupon(modelValid({code}));
          tracking.push(code);
        }
      });

      it("should show all coupons we inserted", async done => {
        await find(tracking);
        done();
      });

      afterAll(async () => clean(tracking));
    });

    describe("search", () => {
      it("search with code should work", async done => {
        let t = [gen() + "atlas", gen() + "centaur", gen() + "1dar"];
        
        for (code of t) {
          await Coupon.createCoupon(modelValid({
            code,
            levels: ["testing"]
          }));
          tracking.push(code);
        }

        const findCode = async (q, coupons, excludes = []) => {
          return find(coupons, excludes, async page => {
            return agent
              .get("/admin/coupon/" + page)
              .query({
                search: true,
                q,
                opt: 1,
                levels: "testing"
              });
          });
        };
        
        await findCode("a", t);
        await findCode("da", [t[2]]);
        await findCode("centaur", [t[1]]);
        await findCode("at", [t[0]]);
        await findCode("ta", [t[1]]);
        await findCode("1", [t[2]]);
        await findCode("", t);
        await findCode("!#", [], t);
        await findCode("atla enta ar", t);

        done();
      }, 15000);

      it("search with name should work", async done => {
        let names = ["thor agena", "delta iv", "thorad"];
        let t = [];
        
        for (let i = 0; i < names.length; i++) {
          const code = gen();
          const newName = gen() + names[i];

          await Coupon.createCoupon(modelValid({
            code,
            name: newName,
            levels: ["testing"]
          }));

          t.push(code);
          tracking.push(code);
        }

        const findName = async (q, coupons, excludes = []) => {
          return find(coupons, excludes, async page => {
            return agent
              .get("/admin/coupon/" + page)
              .query({
                search: true,
                q,
                opt: 3,
                levels: "testing"
              });
          });
        };
        
        await findName("a", t);
        await findName("da", []);
        await findName("centaur", []);
        await findName("at", []);
        await findName("ta", [t[1]]);
        await findName("1", []);
        await findName("", t);
        await findName("!#", [], t);
        await findName("thor delta", t);
        await findName("thor", [t[0], t[2]]);
        await findName("thor agena delta", t);

        done();
      }, 15000);

      it("search with description should work", async done => {
        let descs = ["titan", "iva", "ivb"];
        let t = [];
        
        for (let i = 0; i < descs.length; i++) {
          const code = gen();
          const newDesc = gen() + descs[i];

          await Coupon.createCoupon(modelValid({
            code,
            name: code,
            description: newDesc,
            levels: ["testing"]
          }));

          t.push(code);
          tracking.push(code);
        }

        const findDesc = async (q, coupons, excludes = []) => {
          return find(coupons, excludes, async page => {
            return agent
              .get("/admin/coupon/" + page)
              .query({
                search: true,
                q,
                opt: 2,
                levels: "testing"
              });
          });
        };
        
        await findDesc("a", [t[0], t[1]]);
        await findDesc("da", []);
        await findDesc("centaur", []);
        await findDesc("at", []);
        await findDesc("ta", [t[0]]);
        await findDesc("1", []);
        await findDesc("", t);
        await findDesc("!#", [], t);
        await findDesc("thor delta", []);
        await findDesc("thor", []);
        await findDesc("thor agena delta", []);
        await findDesc("ita i v", t);

        done();
      }, 15000);

      // it("search by levels should work", async done => {
      //   const prefix = gen(9);

      //   let levelEach = [
      //     ["a"],
      //     ["a"],
      //     [..."ab"],
      //     ["b"],
      //     ["c"],
      //     [..."abc"],
      //     [..."abc"],
      //     ["b"],
      //     ["d"]
      //   ];
      //   let t = [];
        
      //   for (let i = 0; i < levelEach.length; i++) {
      //     const code = gen();

      //     await Coupon.createCoupon(modelValid({
      //       code,
      //       name: code,
      //       levels: levelEach[i].map(e => prefix + e)
      //     }));

      //     t.push(code);
      //     tracking.push(code);
      //   };
        
      //   const findLvl = async (levels, coupons, excludes = []) => {
      //     return find(coupons.map(i => t[i]), excludes.map(i => t[i]), async page => {
      //       return agent
      //         .get("/admin/coupon/" + page)
      //         .query({
      //           search: true,
      //           q: "",
      //           opt: 2,
      //           levels: [...levels].map(e => prefix + e)
      //         });
      //     });
      //   };

      //   findLvl("a", [0, 1, 2, 5, 6]);
      //   findLvl("b", [2, 3, 5, 6, 7]);
      //   findLvl("c", [4, 5, 6]);
      //   findLvl("ab", [0, 1, 2, 3, 5, 6, 7]);
      //   findLvl("ac", [0, 1, 2, 4, 5, 6, 7]);
      //   findLvl("bc", [2, 3, 4, 5, 6, 7]);
      //   findLvl("abc", [0, 1, 2, 3, 4, 5, 6, 7]);
      //   findLvl("d", [8]);

      //   done();
      // }, 15000);
    });
  });
});
