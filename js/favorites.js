// --- Switch to favorites status ---
function toggleFavorite(button, albumId) {
  // Get the stored list
  let collection = JSON.parse(localStorage.getItem("myCollection"));
  if (collection == null) {
    collection = [];
  }

  // Loop through to find if the ID already exists
  let foundIndex = -1;
  for (let i = 0; i < collection.length; i++) {
    if (collection[i] == albumId) {
      foundIndex = i;
    }
  }

  // If found, remove; otherwise, add
  if (foundIndex > -1) {
    collection.splice(foundIndex, 1);
    button.className = "fav-btn"; // Remove active style
  } else {
    collection.push(albumId);
    button.className = "fav-btn active"; // Add active style
  }

  // Save data
  localStorage.setItem("myCollection", JSON.stringify(collection));
}

// --- Execute when page loads ---
window.onload = function () {
  let collection = JSON.parse(localStorage.getItem("myCollection"));
  if (collection == null) collection = [];

  let buttons = document.getElementsByClassName("fav-btn");
  for (let i = 0; i < buttons.length; i++) {
    let btn = buttons[i];
    let id = btn.getAttribute("data-id");

    // Loop through to check if this ID is in the collection
    for (let j = 0; j < collection.length; j++) {
      if (collection[j] == id) {
        btn.className = "fav-btn active";
      }
    }
  }

  let list = document.getElementById("collection-list");
  if (list != null) {
    renderCollection(collection);
  }
};

// --- Render favorite list ---
function renderCollection(collection) {
  let list = document.getElementById("collection-list");

  if (collection.length == 0) {
    list.innerHTML = "<p>Your collection is empty.</p>";
  } else {
    list.innerHTML = "<ul>";
    for (let i = 0; i < collection.length; i++) {
      list.innerHTML += "<li>" + collection[i] + "</li>";
    }
    list.innerHTML += "</ul>";
  }
}
