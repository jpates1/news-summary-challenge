const NewsModel = require('./NewsModel');
const NewsClient = require('./NewsClient');

class NewsView {
  constructor() {
    this.headlinesContainer = document.getElementById('headlines-container');
    this.errorMessage = 'Failed to fetch headlines.';
    this.model = new NewsModel();
    this.client = new NewsClient();
  }

  displayNews() {
    const allHeadlines = this.model.getHeadlines();
  
    const headlinesList = document.createElement('ul');
    headlinesList.className = 'news_list';
    
    allHeadlines.response.results.forEach((result) => {
      const headlineEl = document.createElement('li');
      headlineEl.textContent = result.webTitle;
      headlineEl.className = 'news_item';
      headlinesList.appendChild(headlineEl);
    });
    
    this.headlinesContainer.appendChild(headlinesList);
  }
  //   const headlinesHtml = headlines.map((item) => `<li>${item}</li>`).join('');
  //   const newsSummaryContainer = document.createElement('ul');
  //   newsSummaryContainer.className = 'news_summary';
  //   newsSummaryContainer.innerHTML = headlinesHtml;
  //   this.headlinesContainer.appendChild(newsSummaryContainer);
  // }

  displayNotesFromApi() {
    this.client.loadNews((news) => {
      this.model.setHeadlines(news);
      this.displayNews();
    }, () => {
      this.renderError();
    });
  }

  renderError() {
    this.headlinesContainer.innerHTML = this.errorMessage;
  }
}

module.exports = NewsView;