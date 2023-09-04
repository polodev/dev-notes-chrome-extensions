document.addEventListener("DOMContentLoaded", function() {
  const noteInput = document.getElementById("note-input");
  const saveNoteButton = document.getElementById("save-note");
  const notesList = document.getElementById("notes");

  // Load existing notes from storage
  chrome.storage.sync.get("notes", function(result) {
    const notes = result.notes || [];

    notes.forEach(function(note) {
      const listItem = document.createElement("li");
      listItem.textContent = note;
      notesList.appendChild(listItem);
    });
  });

  // Save a new note
  saveNoteButton.addEventListener("click", function() {
    const newNote = noteInput.value.trim();
    if (newNote) {
      chrome.storage.sync.get("notes", function(result) {
        const notes = result.notes || [];
        notes.push(newNote);
        chrome.storage.sync.set({ notes });

        const listItem = document.createElement("li");
        listItem.textContent = newNote;
        notesList.appendChild(listItem);

        noteInput.value = "";
      });
    }
  });
});
