/**
 * @jest-environment jsdom
 */


 const fs = require('fs');
 const NewsView = require('./NewsView');
 const NewsModel = require('./NewsModel');
 const NewsClient = require('./NewsClient');
 
 require('jest-fetch-mock').enableMocks()
 
 describe('NewsView', () => {
   let view;
   let model;
   let client;
 
   beforeEach(() => {
     document.body.innerHTML = fs.readFileSync('./index.html');
     model = new NewsModel();
     client = {
       loadNews: jest.fn(),
     }
     view = new NewsView(model, client);
   });
 
   it('displays headlines on the page', () => {
     const headlines = {
       response: {
         results: [
           { webTitle: 'Headline 1' },
           { webTitle: 'Headline 2' },
           { webTitle: 'Headline 3' },
         ],
       },
     };
     
     model.setHeadlines(headlines);
     view.displayNews();
     expect(document.querySelectorAll('.news_item').length).toBe(3);
   });
 
   it('displays headlines fetched from the API on the page', () => {
     const headlines = {
       response: {
         results: [
           { webTitle: 'API Headline 1' },
           { webTitle: 'API Headline 2' },
         ],
       },
     };
 
     const successCallback = jest.fn();
     const errorCallback = jest.fn();
 
     client.loadNews.mockImplementation((success, error) => {
       success(headlines);
     });
 
     view.displayNewsFromApi();
 
     expect(successCallback).toHaveBeenCalledTimes(1);
     expect(errorCallback).toHaveBeenCalledTimes(0);
     expect(model.setHeadlines).toHaveBeenCalledWith(headlines);
     expect(view.displayNews).toHaveBeenCalledTimes(1);
   });
 
   it('renders an error message on the page when there is an API error', () => {
     const error = new Error('API error');
 
     const successCallback = jest.fn();
     const errorCallback = jest.fn();
 
     client.loadNews.mockImplementation((success, error) => {
       error();
     });
 
     view.displayNewsFromApi();
 
     expect(successCallback).toHaveBeenCalledTimes(0);
     expect(errorCallback).toHaveBeenCalledTimes(1);
     expect(view.renderError).toHaveBeenCalledTimes(1);
     expect(view.headlinesContainer.innerHTML).toEqual(view.errorMessage);
   });
 });