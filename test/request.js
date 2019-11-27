const supertest = require("supertest");
const app = require("../server/server");

const request = supertest(app);

module.exports = request;
