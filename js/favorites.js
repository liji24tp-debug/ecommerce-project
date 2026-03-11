// Switch collection status
function toggleFavorite(button, albumId) {
  let collection = JSON.parse(localStorage.getItem("myCollection")) || [];
  const index = collection.indexOf(albumId);

  if (index > -1) {
    // If it exists, remove it
    collection.splice(index, 1);
    button.classList.remove("active");
  } else {
    // Add if it does not exist.
    collection.push(albumId);
    button.classList.add("active");
  }
  localStorage.setItem("myCollection", JSON.stringify(collection));
}

// Restore heart state when page loads
window.onload = function () {
  let collection = JSON.parse(localStorage.getItem("myCollection")) || [];
  document.querySelectorAll(".fav-btn").forEach((btn) => {
    if (collection.includes(btn.getAttribute("data-id"))) {
      btn.classList.add("active");
    }
  });

  // If it's a cart.html page, render the list.
  if (document.getElementById("collection-list")) {
    renderCollection();
  }
};

// Render collection content
function renderCollection() {
  const list = document.getElementById("collection-list");
  let collection = JSON.parse(localStorage.getItem("myCollection")) || [];

  if (collection.length === 0) {
    list.innerHTML = "<p>Your collection is empty.</p>";
  } else {
    list.innerHTML =
      "<ul>" + collection.map((item) => `<li>${item}</li>`).join("") + "</ul>";
  }
}
