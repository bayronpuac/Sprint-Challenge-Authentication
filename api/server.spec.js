const request = require("supertest");

const server = require("./server.js");

const auth = require('../auth/auth-router.js');


it("should set db environment to testing", function() {
    expect(process.env.DB_ENV).toBe("testing");
  });

    describe('GET /', function() {
        it('should return 200 ok', function() {
            return request(server)
        .get("/")
        .then(res => {
          expect(res.status).toBe(200);
        });
    });

    it('should get a list of users', function() {
        return request(server)
    .get('/')
    .then(res => {
      expect(res.status).toBe(200);
        });
    })

    it("should return JSON formatted response", function() {
        return request(server)
            .get("/")
            .then(res => {
            expect(res.type).toMatch(/json/i);
            });
        });
    })


    describe('POST /register', function() {
        it('should get a list of users', function() {
            return request(auth)
        .post('/api/auth/register')
        .then(res => {
          expect(res.status).toBe(201);
            });
        })
        it("should return JSON formatted response", function() {
            return request(auth)
                .post("/register")
                .then(res => {
                expect(res.type).toMatch(/json/i);
                });
            });

     })

     describe('POST /login', function() {
        it('should get a list of user', function() {
            return request(auth)
        .post('/login')
        .then(res => {
          expect(res.status).toBe(200);
            });
        })
        it("should return JSON formatted response", function() {
            return request(auth)
                .post("/login")
                .then(res => {
                expect(res.type).toMatch(/json/i);
                });
            });
     })
