import { fetchWantedList, fetchCountryDetails } from "../modules/api.js";
import { filterResults, sortResults } from "../modules/search.js";
import { saveTrackedPerson, getTrackedPersons, clearTrackedPersons, removeTrackedPerson } from "../modules/tracking.js";
import { renderResults, renderTrackedList, showDetails, closeModal } from "../modules/ui.js";
import { cleanData } from "../modules/data.js";

let items = [];
let currentKeyword = "";
let currentSort = "default";
let currentPage = parseInt(localStorage.getItem("currentPage") || "1");

// Handle search, sort, pagination, and details for index.html
if (document.querySelector("#search-form")) {
  const searchForm = document.querySelector("#search-form");
  const searchInput = document.querySelector("#search-input");
  const resultsContainer = document.querySelector("#results");
  const sortSelect = document.querySelector("#sort-select");
  const prevBtn = document.querySelector("#prev-page");
  const nextBtn = document.querySelector("#next-page");

  const renderPage = () => {
    const cleanedItems = cleanData(items);
    const filteredItems = filterResults(cleanedItems, currentKeyword);
    const sortedItems = sortResults(filteredItems, currentSort);
    renderResults(sortedItems, resultsContainer, currentPage);
    localStorage.setItem("currentPage", currentPage.toString());
  };

  searchForm.addEventListener("submit", async e => {
    e.preventDefault();
    resultsContainer.innerHTML = "<p>Loading...</p>";
    currentKeyword = searchInput.value.trim();
    currentPage = 1;
    items = await fetchWantedList();
    if (!items.length) {
      resultsContainer.innerHTML = "<p>Failed to load data. Try again later.</p>";
      return;
    }
    renderPage();
  });

  sortSelect?.addEventListener("change", () => {
    currentSort = sortSelect.value;
    currentPage = 1;
    renderPage();
  });

  prevBtn?.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderPage();
    }
  });

  nextBtn?.addEventListener("click", () => {
    const totalPages = Math.ceil(items.length / 10);
    if (currentPage < totalPages) {
      currentPage++;
      renderPage();
    }
  });

  resultsContainer.addEventListener("click", e => {
    const title = e.target.dataset.title;
    if (!title) return;
    const person = items.find(item => item.title === title);
    if (!person) return;
    if (e.target.classList.contains("track-btn")) {
      saveTrackedPerson(person);
    } else if (e.target.classList.contains("details-btn")) {
      showDetails(person, fetchCountryDetails);
    }
  });

  document.querySelector("#close-modal")?.addEventListener("click", closeModal);
}

// Handle tracked list, clear all, and remove for tracked.html
if (document.querySelector("#tracked-section")) {
  const trackedContainer = document.querySelector("#tracked-list");
  const clearAllBtn = document.querySelector("#clear-all");

  const renderTracked = () => {
    const tracked = getTrackedPersons();
    renderTrackedList(tracked, trackedContainer);
  };

  renderTracked();

  clearAllBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear all tracked persons?")) {
      clearTrackedPersons();
      renderTracked();
    }
  });

  trackedContainer.addEventListener("click", e => {
    if (e.target.classList.contains("remove-btn")) {
      const title = e.target.dataset.title;
      removeTrackedPerson(title);
      renderTracked();
    }
  });
}