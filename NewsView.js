const NewsModel = require('./NewsModel');
const NewsClient = require('./NewsClient');

class NewsView {
  constructor(model, client) {
    this.headlinesContainer = document.getElementById('headlines-container');
    this.errorMessage = 'Failed to fetch headlines.';
    this.model = model;
    this.client = client;
  }

  displayNews() {
    const { response: { results } } = this.model.getHeadlines();
    const newsList = document.querySelector('.news_list');
  
    results.forEach(article => {
      const newsItem = document.createElement('li');
      newsItem.classList.add('news_item');
      newsItem.innerHTML = article.webTitle;
  
      newsList.appendChild(newsItem);
    });
  }

  displayNewsFromApi() {
    this.client.loadNews((news) => {
      this.model.setHeadlines(news);
      this.displayNews();
      successCallback(); // call success callback
    }, () => {
      this.renderError();
      errorCallback(); // call error callback
    });
  }

  renderError() {
    this.headlinesContainer.innerHTML = this.errorMessage;
  }
}

module.exports = NewsView;