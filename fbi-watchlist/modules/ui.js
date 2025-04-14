export function renderResults(items, container) {
  container.innerHTML = "";
  if (!items.length) {
    container.innerHTML = "<p>No results found.</p>";
    return;
  }
  items.forEach(item => {
    const card = document.createElement("div");
    card.className = "result-card";
    card.innerHTML = `
      <img src="${item.images?.[0]?.thumb || "images/silhouette.webp"}" alt="${item.title || "Unknown"}">
      <h3>${item.title || "N/A"}</h3>
      <p>${item.description || "No description"}</p>
      <button data-title="${item.title}" class="track-btn">Track</button>
      <button data-title="${item.title}" class="details-btn">Details</button>
    `;
    container.appendChild(card);
  });
}

export function renderTrackedList(tracked, container) {
  container.innerHTML = "";
  if (!tracked.length) {
    container.innerHTML = "<p>No tracked persons.</p>";
    return;
  }
  tracked.forEach(item => {
    const card = document.createElement("div");
    card.className = "tracked-card";
    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <h3>${item.title}</h3>
      <p>${item.description}</p>
    `;
    container.appendChild(card);
  });
}