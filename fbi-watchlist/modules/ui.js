// Utility to strip HTML tags (as a fallback)
function stripHTML(str) {
  if (!str) return str;
  const div = document.createElement("div");
  div.innerHTML = str;
  return div.textContent.trim().replace(/\s+/g, " ");
}

export function renderResults(items, container, page = 1, itemsPerPage = 10) {
  container.innerHTML = "";
  if (!items.length) {
    container.innerHTML = "<p>No results found.</p>";
    return;
  }
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedItems = items.slice(start, end);

  paginatedItems.forEach(item => {
    const card = document.createElement("div");
    card.className = "result-card";
    card.innerHTML = `
      <img src="${item.images?.[0]?.thumb || "images/silhouette.webp"}" alt="${item.title || "Unknown"}">
      <h3>${item.title || "N/A"}</h3>
      <p>${item.description || "No description"}</p>
      <button data-title="${item.title}" class="track-btn"><i class="fas fa-bookmark"></i> Track</button>
      <button data-title="${item.title}" class="details-btn">Details</button>
    `;
    container.appendChild(card);
  });

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const pageInfo = document.querySelector("#page-info");
  const prevBtn = document.querySelector("#prev-page");
  const nextBtn = document.querySelector("#next-page");
  if (pageInfo) {
    pageInfo.textContent = `Page ${page} of ${totalPages}`;
    prevBtn.disabled = page === 1;
    nextBtn.disabled = page === totalPages;
  }
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
      <button data-title="${item.title}" class="remove-btn">Remove</button>
    `;
    container.appendChild(card);
  });
}

export function showDetails(item, fetchCountryDetails) {
  const modal = document.querySelector("#details-modal");
  const modalTitle = document.querySelector("#modal-title");
  const modalImage = document.querySelector("#modal-image");
  const modalDescription = document.querySelector("#modal-description");
  const modalCaution = document.querySelector("#modal-caution");
  const modalExtra = document.querySelector("#modal-extra");

  modal.classList.add("active");
  modalTitle.textContent = stripHTML(item.title) || "N/A";
  modalImage.src = item.images?.[0]?.thumb || "images/silhouette.webp";
  modalImage.alt = stripHTML(item.title) || "Unknown";
  modalDescription.textContent = stripHTML(item.description) || "No description";
  modalCaution.textContent = `Caution: ${stripHTML(item.caution) || "N/A"}`;
  modalExtra.innerHTML = `
    <p>Subjects: ${item.subjects?.map(s => stripHTML(s)).join(", ") || "N/A"}</p>
    <p>Sex: ${stripHTML(item.sex) || "N/A"}</p>
    <p>Nationality: ${stripHTML(item.nationality) || "N/A"}</p>
    <p>Reward: ${stripHTML(item.reward) || "N/A"}</p>
  `;

  if (item.nationality && fetchCountryDetails) {
    fetchCountryDetails(item.nationality).then(country => {
      if (country) {
        modalExtra.innerHTML = `
          <p>Subjects: ${item.subjects?.map(s => stripHTML(s)).join(", ") || "N/A"}</p>
          <p>Sex: ${stripHTML(item.sex) || "N/A"}</p>
          <p>Nationality: ${stripHTML(item.nationality) || "N/A"}</p>
          <p>Reward: ${stripHTML(item.reward) || "N/A"}</p>
          <p>Country Capital: ${stripHTML(country.capital?.[0]) || "N/A"}</p>
          <p>Country Population: ${country.population?.toLocaleString() || "N/A"}</p>
        `;
      }
    });
  }

  modal.style.display = "flex";
}

export function closeModal() {
  const modal = document.querySelector("#details-modal");
  modal.classList.remove("active");
  setTimeout(() => {
    modal.style.display = "none";
  }, 300);
}