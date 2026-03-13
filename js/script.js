// Function to toggle favorites status
function toggleFavorite(button, albumId) {
  let fullCollection = JSON.parse(localStorage.getItem("fullCollection")) || [];
  let imgSrc = button.getAttribute("data-img");

  let priceElement =
    button.parentElement.querySelector(".price") ||
    button.parentElement.querySelector(".detail-price");
  let priceText = priceElement ? priceElement.innerText : "";

  let index = -1;
  for (let i = 0; i < fullCollection.length; i++) {
    if (fullCollection[i].id == albumId) {
      index = i;
    }
  }

  if (index > -1) {
    fullCollection.splice(index, 1);
    button.className = "fav-btn";
  } else {
    fullCollection.push({ id: albumId, img: imgSrc, price: priceText });
    button.className = "fav-btn active";
  }

  localStorage.setItem("fullCollection", JSON.stringify(fullCollection));

  if (document.getElementById("collection-list")) {
    renderCollection();
  }
}

// Render collection list
function renderCollection() {
  let list = document.getElementById("collection-list");
  let fullCollection = JSON.parse(localStorage.getItem("fullCollection")) || [];

  if (list == null) return;

  if (fullCollection.length == 0) {
    list.innerHTML = "<p>Your collection is empty.</p>";
  } else {
    list.innerHTML = "";
    for (let i = 0; i < fullCollection.length; i++) {
      let item = fullCollection[i];

      list.innerHTML +=
        '<div class="product-item">' +
        '  <img src="' +
        item.img +
        '" alt="' +
        item.id +
        '" />' +
        '  <p style="margin-top:10px; font-weight:bold;">' +
        item.id +
        "</p>" +
        '  <p class="price">' +
        (item.price || "") +
        "</p>" +
        '  <button class="fav-btn active" ' +
        '          data-id="' +
        item.id +
        '" ' +
        '          data-img="' +
        item.img +
        '" ' +
        "          onclick=\"toggleFavorite(this, '" +
        item.id +
        "')\">" +
        "    ❤" +
        "  </button>" +
        "</div>";
    }
  }
}

// Execute when page loads
window.onload = function () {
  let fullCollection = JSON.parse(localStorage.getItem("fullCollection")) || [];

  let buttons = document.getElementsByClassName("fav-btn");
  for (let i = 0; i < buttons.length; i++) {
    let btn = buttons[i];
    let id = btn.getAttribute("data-id");
    for (let j = 0; j < fullCollection.length; j++) {
      if (fullCollection[j].id == id) {
        btn.className = "fav-btn active";
      }
    }
  }

  renderCollection();
};
