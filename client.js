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

  // createNote(note, cb) {
  //   return fetch('http://localhost:3000/notes', {
  //     method: "POST", // or 'PUT'
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({content: note}),
  //   })
  //     .then((response) => response.json())
  //     .then((note) => {
  //       return note
  //     })
  //     .catch((error) => {
  //       cb(error);
  //       console.log("Error:", error);
  //     });
  // };

  // resetNotes(successCB, errorCB) {
  //   fetch('http://localhost:3000/notes', {
  //     method: 'DELETE'
  //   })
  //     .then(() => {
  //       successCB();
  //     })
  //     .catch(() => {
  //       errorCB();
  //     });
  // }
  
}

module.exports = NewsClient;