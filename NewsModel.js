class NewsModel {
  constructor() {
    this.headlines = null;
  }

  setHeadlines(headlines) {
    this.headlines = headlines;
  }

  getHeadlines() {
    return this.headlines;
  }
}

module.exports = NewsModel;