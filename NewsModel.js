class NewsModel {
  constructor() {
    this.headlines = null;
  }

  getHeadlines() {
    return this.headlines;
  }

  setHeadlines(headlines) {
    this.headlines = headlines;
  }

  addNews(headlines) {
    this.headlines.push(headlines);
  }

  reset() {
    this.headlines = null;
  }
}
module.exports = NewsModel;