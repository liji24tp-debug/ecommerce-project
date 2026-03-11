// --- JS Script for Musical Album Museum ---

/**
 * Toggles the favorite status of an album.
 * If the page is cart.html, it will also re-render the list immediately.
 */
function toggleFavorite(button, albumId) {
  let fullCollection = JSON.parse(localStorage.getItem("fullCollection")) || [];
  const imgSrc = button.getAttribute("data-img");

  const index = fullCollection.findIndex((item) => item.id === albumId);

  if (index > -1) {
    fullCollection.splice(index, 1);
    button.classList.remove("active");
  } else {
    fullCollection.push({ id: albumId, img: imgSrc });
    button.classList.add("active");
  }

  localStorage.setItem("fullCollection", JSON.stringify(fullCollection));

  // If we are on the cart page, update the view immediately
  if (document.getElementById("collection-list")) {
    renderCollection();
  }
}

/**
 * Renders the collection list to the DOM.
 */
function renderCollection() {
  const list = document.getElementById("collection-list");
  let fullCollection = JSON.parse(localStorage.getItem("fullCollection")) || [];

  if (!list) return; // Safety check

  if (fullCollection.length === 0) {
    list.innerHTML =
      "<p style='grid-column: 1/-1; text-align: center;'>Your collection is empty.</p>";
  } else {
    list.innerHTML = fullCollection
      .map(
        (item) => `
            <div class="product-item">
                <img src="${item.img}" alt="${item.id}" />
                <p style="margin-top:10px; font-weight:bold;">${item.id}</p>
                <button class="fav-btn active" 
                        data-id="${item.id}" 
                        data-img="${item.img}" 
                        onclick="toggleFavorite(this, '${item.id}')">
                    ❤
                </button>
            </div>
        `,
      )
      .join("");
  }
}

// Logic to execute when the page loads
window.onload = function () {
  let fullCollection = JSON.parse(localStorage.getItem("fullCollection")) || [];

  // 1. Maintain heart icon state on the Gallery page
  document.querySelectorAll(".fav-btn").forEach((btn) => {
    const id = btn.getAttribute("data-id");
    if (fullCollection.find((item) => item.id === id)) {
      btn.classList.add("active");
    }
  });

  // 2. Render the collection list if on the collection page
  renderCollection();
};
