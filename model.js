class NewsModel {
  constructor () {
    this.summary = [];
  }
  getNews() {
    return this.summary
  }

  setNews(sum) {
    this.summary = note;
  }
  addNews(sum) {
    this.summary.push(sum);
  }

  reset() {
    this.summary = [];
  }
}

module.exports = NewsModel;