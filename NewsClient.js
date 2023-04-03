
class NewsClient {
  loadNews(successCB, errorCB) {
    fetch('https://content.guardianapis.com/search?api-key=e5449d12-726c-4596-952e-8c3072eeae1f')
      .then(response => response.json())
      .then(data => {
        successCB(data);
      })
      .catch(() => {
        errorCB();
      });
  }
}

module.exports = NewsClient;