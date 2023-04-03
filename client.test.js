/**
 * @jest-environment jsdom
 */


 const NewsClient = require('./NewsClient');

 require('jest-fetch-mock').enableMocks()
 
 describe('Client class', () => {
     it('calls fetch and loads data', (done) => {
       const client = new NewsClient();
   
       fetch.mockResponseOnce(JSON.stringify({
         name: "Some Value",
         id: 123
       }));
   
       client.loadNews((returnedDataFromAPI) => {
         expect(returnedDataFromAPI.name).toBe("Some Value");
         expect(returnedDataFromAPI.id).toBe(123);
         done();
       });
     });
   });