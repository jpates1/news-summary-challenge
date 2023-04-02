const NewsModel = require('./NewsModel');
const NewsClient = require('./NewsClient');
const NewsView = require('./NewsView');

const newsModel = new NewsModel();
const newsClient = new NewsClient();
const newsView = new NewsView(newsModel, newsClient);

newsView.displayNotesFromApi();