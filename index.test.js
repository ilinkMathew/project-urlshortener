const request = require('supertest');
const app = require('.');
const testUrl = `https://google.com`;
const InvalidUrl = `test123`
const inValidError = {'error':'invalid url'};
describe(`'/api/shorturl' `, () => {
   it('should exist ', () => {
    return request(app)
           .post('/api/shorturl')
           .set('Accept','application/json')
           .expect(200)
   }); 

   
   it(`should have accept a body with key 'url' and should return the original back `, () => {
    return request(app)
           .post('/api/shorturl')
           .send(`url=${testUrl}`)
           .set('Accept','application/json')
           .expect(200)
           .then((res)=>{
            expect(res.body.original_url).toBe(testUrl)
           })
   }); 

   it(`should return a json with keys 'original_url' & 'short_url'`, () => {
    return request(app)
           .post('/api/shorturl')
           .send(`url=${testUrl}`)
           .set('Accept','application/json')
           .expect(200)
           .then((res)=>{
            expect(res.body.original_url).toBeDefined();
            expect(res.body.short_url).toBeDefined();
           })
   }); 

   it(`should return a json key 'short_url' of type integer`, () => {
    return request(app)
           .post('/api/shorturl')
           .send(`url=${testUrl}`)
           .set('Accept','application/json')
           .expect(200)
           .then((res)=>{
            expect(typeof res.body.short_url).toBe('number');
           })
   });

   it(`should return a {'error':'invalid url'} if body(original_url) has invalid url format `, () => {
    return request(app)
           .post('/api/shorturl')
           .send(`url=${InvalidUrl}`)
           .set('Accept','application/json')
           .expect(200)
           .then((res)=>{
            expect(res.body).toEqual(inValidError);
           })
   });

});