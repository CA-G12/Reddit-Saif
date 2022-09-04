const supertest = require('supertest');
const dbBuild = require('../database/config/build');
const router = require('../app');
const connection = require('../database/config/connection');

beforeAll(() => dbBuild());
afterAll(() => connection.end());

describe('Sign up Router', () => {
  test('should return user added successfully', (done) => {
    supertest(router)
      .post('/api/v1/sign-up')
      .send({
        password: '123456',
        email: 'saif@gmail.com',
        username: 'saif',
        img: 'https://picsum.photos/200',
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.body.msg).toEqual('User added successfully');
          done();
        }
      });
  });
  test('should return password invalid', (done) => {
    supertest(router)
      .post('/api/v1/sign-up')
      .send({
        password: '1234',
        email: 'saif@gmail.com',
        username: 'saif',
        img: 'https://picsum.photos/200',
      })
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.body.msg).toEqual('"password" length must be at least 6 characters long');
          done();
        }
      });
  });
  test('should return email invalid', (done) => {
    supertest(router)
      .post('/api/v1/sign-up')
      .send({
        password: '1234',
        email: 'saifmail.com',
        username: 'saif',
        img: 'https://picsum.photos/200',
      })
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.body.msg).toEqual('"email" must be a valid email');
          done();
        }
      });
  });
  test('should return email already exists', (done) => {
    supertest(router)
      .post('/api/v1/sign-up')
      .send({
        password: '123456',
        email: 'saif@gmail.com',
        username: 'saif',
        img: 'https://picsum.photos/200',
      })
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.body.msg).toEqual('Email already exists');
          done();
        }
      });
  });
  test('should return username already exists', (done) => {
    supertest(router)
      .post('/api/v1/sign-up')
      .send({
        password: '123456',
        email: 'saidfaf@gmail.com',
        username: 'saif',
        img: 'https://picsum.photos/200',
      })
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.body.msg).toEqual('Username already exists');
          done();
        }
      });
  });
  test('should return username length mush be at least 2 chars', (done) => {
    supertest(router)
      .post('/api/v1/sign-up')
      .send({
        password: '123456',
        email: 'saidfaf@gmail.com',
        username: 's',
        img: 'https://picsum.photos/200',
      })
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.body.msg).toEqual('"username" length must be at least 2 characters long');
          done();
        }
      });
  });
  test('should return image length mush be at least 2 chars', (done) => {
    supertest(router)
      .post('/api/v1/sign-up')
      .send({
        password: '123456',
        email: 'saidfaffdsa@gmail.com',
        username: 'saifdsf',
        img: 'ht',
      })
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.body.msg).toEqual('"img" length must be at least 4 characters long');
          done();
        }
      });
  });
  test('should return password is required', (done) => {
    supertest(router)
      .post('/api/v1/sign-up')
      .send({
        email: 'saidfaffdsa@gmail.com',
        username: 'saifdsf',
        img: 'ht',
      })
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.body.msg).toEqual('"password" is required');
          done();
        }
      });
  });
  test('should return email is required', (done) => {
    supertest(router)
      .post('/api/v1/sign-up')
      .send({
        password: '123456',
        username: 'saifdsf',
        img: 'ht',
      })
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.body.msg).toEqual('"email" is required');
          done();
        }
      });
  });
  test('should return username is required', (done) => {
    supertest(router)
      .post('/api/v1/sign-up')
      .send({
        password: '123456',
        email: 'seefhayek4@gamil.com',
        img: 'htdasf',
      })
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.body.msg).toEqual('"username" is required');
          done();
        }
      });
  });
  test('should return image is required', (done) => {
    supertest(router)
      .post('/api/v1/sign-up')
      .send({
        password: '123456',
        email: 'seefhayek4@gamil.com',
        username: 'saife',
      })
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.body.msg).toEqual('"img" is required');
          done();
        }
      });
  });
});
