document.addEventListener("DOMContentLoaded", function () {
  const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
  const output = document.querySelector("#output");
  const themeToggleBtn = document.querySelector("#theme-toggle");
  storedNotes.forEach((note) => {
    let pre = document.createElement("pre");
    pre.innerHTML = note;
    output.append(pre);
  });

  document.querySelector("#add-note").onclick = function () {
    const note = document.querySelector("#textbox").value;

    if (note.trim() === "") return false;

    let pre = document.createElement("pre");
    pre.innerHTML = note;
    output.append(pre);

    storedNotes.push(note);
    localStorage.setItem("notes", JSON.stringify(storedNotes));

    document.querySelector("#textbox").value = "";

    return false;
  };

  document.querySelector("#clear-notes").onclick = function () {
    localStorage.removeItem("notes");
    output.innerHTML = "";
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
