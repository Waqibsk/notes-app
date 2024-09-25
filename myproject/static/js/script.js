const API_URL = "http://127.0.0.1:8000/api/notes/";

function fetchNotes() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            // Use the notes data here
        })
        .catch(error => console.error('Error fetching notes:', error));
}

document.addEventListener("DOMContentLoaded", function () {
  const output = document.querySelector("#output");
  const themeToggleBtn = document.querySelector("#theme-toggle");
  const textbox = document.querySelector("#textbox");

  // Function to create a note element in the DOM
  function createNoteElement(note) {
    let noteContainer = document.createElement("div");
    noteContainer.classList.add("note-container");

    let pre = document.createElement("pre");
    pre.innerHTML = note.content;
    pre.contentEditable = true;
    pre.dataset.id = note.id; // Use the note's ID for reference

    // DELETE FUNCTIONALITY
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    let trashIcon = document.createElement("i");
    trashIcon.classList.add("fas", "fa-trash");
    deleteButton.appendChild(trashIcon);

    deleteButton.onclick = function () {
      fetch(`/api/notes/${note.id}/`, {
        method: 'DELETE'
      })
      .then(() => {
        noteContainer.remove(); // Remove note from UI
      });
    };

    // Add the elements to the note container
    noteContainer.append(pre);
    noteContainer.append(deleteButton);
    output.append(noteContainer);
  }

  // Fetch notes from the backend and display them
  function loadNotes() {
    fetch('/api/notes/')
      .then(response => response.json())
      .then(notes => {
        output.innerHTML = ''; // Clear existing notes in the UI
        notes.forEach(note => createNoteElement(note));
      });
  }

  // Initialize the app by loading the notes
  loadNotes();

  // Add new note functionality
  document.querySelector("#add-note").onclick = function () {
    const noteContent = textbox.value;

    if (noteContent.trim() === "") return false;

    fetch('/api/notes/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: "Note", // Optional title; can be changed based on your model
        content: noteContent
      })
    })
    .then(response => response.json())
    .then(newNote => {
      createNoteElement(newNote);  // Update the UI with the new note
      textbox.value = ""; // Clear the input field after adding
    });

    return false;
  };

  // Clear all notes (Optional: needs backend support)
  document.querySelector("#clear-notes").onclick = function () {
    fetch('/api/notes/', {
      method: 'DELETE'
    })
    .then(() => {
      output.innerHTML = ''; // Clear the UI
    });
    return false;
  };

  // Theme toggle functionality
  const currentTheme = localStorage.getItem("theme") || "light";
  if (currentTheme === "dark") {
    document.body.classList.add("dark-mode");
  }

  themeToggleBtn.onclick = function () {
    document.body.classList.toggle("dark-mode");
    const newTheme = document.body.classList.contains("dark-mode") ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
  };
});
