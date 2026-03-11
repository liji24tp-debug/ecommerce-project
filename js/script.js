/* All comments in English to meet assignment requirements */

// Function to handle adding/removing from collection
function toggleFavorite(button, albumId) {
  // Get existing collection from localStorage or initialize empty array
  let collection = JSON.parse(localStorage.getItem("myCollection")) || [];

  // Check if item is already in the collection
  const index = collection.indexOf(albumId);

  if (index > -1) {
    // Item exists: Remove it (Unlike)
    collection.splice(index, 1);
    button.classList.remove("active");
    console.log("Removed: " + albumId);
  } else {
    // Item does not exist: Add it (Like)
    collection.push(albumId);
    button.classList.add("active");
    console.log("Added: " + albumId);
  }

  // Save updated collection back to localStorage
  localStorage.setItem("myCollection", JSON.stringify(collection));
}

// Function to maintain state when page reloads
function checkFavorites() {
  let collection = JSON.parse(localStorage.getItem("myCollection")) || [];
  const buttons = document.querySelectorAll(".fav-btn");

  buttons.forEach((btn) => {
    // Get the ID from the data-id attribute we set in HTML
    const id = btn.getAttribute("data-id");
    if (collection.includes(id)) {
      btn.classList.add("active");
    }
  });
}

// Initialize when page is loaded
window.onload = checkFavorites;
