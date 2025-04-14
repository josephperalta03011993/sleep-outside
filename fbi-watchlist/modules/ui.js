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

// Utility function to strip HTML tags and clean text
function stripHTML(html) {
  const div = document.createElement("div");
  div.innerHTML = html || "";
  return div.textContent.trim().replace(/\s+/g, " ");
}

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
      <img src="${item.images?.[0]?.thumb || "images/placeholder.jpg"}" alt="${item.title || "Unknown"}">
      <h3>${item.title || "N/A"}</h3>
      <p>${item.description || "No description"}</p>
      <button data-title="${item.title}" class="track-btn"><i class="fas fa-bookmark"></i> Track</button>
      <button data-title="${item.title}" class="details-btn">Details</button>
    `;
    container.appendChild(card);
  });
}

export function showDetails(item) {
  const modal = document.querySelector("#details-modal");
  const modalTitle = document.querySelector("#modal-title");
  const modalImage = document.querySelector("#modal-image");
  const modalDescription = document.querySelector("#modal-description");
  const modalCaution = document.querySelector("#modal-caution");

  modalTitle.textContent = item.title || "N/A";
  modalImage.src = item.images?.[0]?.thumb || "images/placeholder.jpg";
  modalImage.alt = item.title || "Unknown";
  modalDescription.textContent = stripHTML(item.description) || "No description";
  modalCaution.textContent = `Caution: ${stripHTML(item.caution) || "N/A"}`;

  modal.style.display = "flex";
}

export function closeModal() {
  const modal = document.querySelector("#details-modal");
  modal.style.display = "none";
}