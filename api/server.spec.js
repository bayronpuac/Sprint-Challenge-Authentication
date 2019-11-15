const request = require("supertest");

const server = require("./server.js");

const auth = require('../auth/auth-router');

it("should set db environment to testing", function() {
    expect(process.env.DB_ENV).toBe("testing");
  });

    describe('GET /', function() {
        it("should return an 'api' property with the value 'up' inside the body", function() {
            return request(server)
              .get("/")
              .then(res => {
                // expect(res.body).toEqual({ api: "up" });
                expect(res.body.api).toBe("It's alive");
              });
          });

          it('should return 200 ok', function() {
            return request(server)
        .get("/")
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
    })


    describe('POST /register', function() {
        it('should return 200 ok', function() {
            return request(auth)
        .post("/register")
        .then(res => {
          expect(res.status).toBe(201);
        })
    })
    
    it("should return JSON formatted response", function() {
        return request(auth)
            .post('/register')
            .then(res => {
            expect(res.type).toMatch(/json/i);
            });
        });
    
 })