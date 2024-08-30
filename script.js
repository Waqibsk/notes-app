document.addEventListener("DOMContentLoaded", function () {
  const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
  const output = document.querySelector("#output");
  const themeToggleBtn = document.querySelector("#theme-toggle");

  function createNoteElement(note, index) {
    let noteContainer = document.createElement("div");
    noteContainer.classList.add("note-container");

    let pre = document.createElement("pre");
    pre.innerHTML = note;
    pre.contentEditable = true;
    pre.dataset.index = index;

    // AUTO SAVE FUNCTONALITY
    pre.oninput = function () {
      let updatedNote = pre.innerHTML.trim();
      if (updatedNote !== "") {
        storedNotes[index] = updatedNote;
        localStorage.setItem("notes", JSON.stringify(storedNotes));
      }
    };
//DELETE BUTTONS AND THEIR WORK
    let deleteButton = document.createElement("button");
   
    deleteButton.classList.add("delete-button");
    let trashIcon = document.createElement("i");
    trashIcon.classList.add("fas", "fa-trash");

    deleteButton.appendChild(trashIcon);
    deleteButton.onclick = function () {
      storedNotes.splice(index, 1);
      localStorage.setItem("notes", JSON.stringify(storedNotes));
      noteContainer.remove();
    };

    noteContainer.append(pre);
    noteContainer.append(deleteButton);
    output.append(noteContainer);
  }

  // Initialize notes
  function initializeNotes() {
    output.innerHTML = "";
    storedNotes.forEach((note, index) => {
      createNoteElement(note, index);
    });
  }

  initializeNotes();

  document.querySelector("#add-note").onclick = function () {
    const note = document.querySelector("#textbox").value;

    if (note.trim() === "") return false;

    createNoteElement(note, storedNotes.length);
    storedNotes.push(note);
    localStorage.setItem("notes", JSON.stringify(storedNotes));

    document.querySelector("#textbox").value = "";

    return false;
  };

  document.querySelector("#clear-notes").onclick = function () {
    localStorage.removeItem("notes");
    storedNotes.length = 0; // Clear the storedNotes array
    output.innerHTML = ""; // Clear the output container
    return false;
  };

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
