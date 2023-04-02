/**
 * @jest-environment jsdom
 */

 const fs = require('fs');
 const NewsView = require('./NewsView');
 const NewsModel = require('./NewsModel');
const { resolve } = require('path');

 describe('NewsView', () => {
  let view;
  let model;
  let client;

  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync('./index.html');
    model = new NewsModel();
    client = {
      loadNotes: jest.fn(),
      createNote: jest.fn(),
    };
    view = new NewsView(model, client);
  });

  describe('displayNotes', () => {
    it('gets notes, creates new divs on page', () => {
      model.addNote('Today is good');
      model.addNote('Today is bad');
      model.addNote('Today is ok');
      view.displayNotes();
      expect(document.querySelectorAll('.note').length).toBe(3);
    });

    it('clicks button, adds note to the page', () => {

      const noteInput = document.querySelector('#note-input');
      const note = "My amazing test note";
      noteInput.value = note;

      client.createNote.mockImplementation((note) => {
        model.addNote(note);
        view.displayNotes();
      });

      const buttonEl = document.querySelector('#add-note-button');
      buttonEl.click();

      expect(client.createNote).toBeCalledWith(note, expect.any(Function));
      expect(document.querySelectorAll('div.note').length).toEqual(2);
    });

    it('displays notes from api', () => {
      document.body.innerHTML = fs.readFileSync('./index.html');

      const notes = ['Note 1', 'Note 2', 'Note 3'];
      client.loadNotes.mockImplementation(callback => {
        callback(notes);
      });

      view.displayNotesFromApi();

      expect(client.loadNotes).toHaveBeenCalled();
      expect(model.getNotes()).toEqual(notes);
      expect(document.querySelectorAll('.note').length).toBe(notes.length);
    });
  });
 });
