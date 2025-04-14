import { fetchWantedList } from "../modules/api.js";
import { filterResults, sortResults } from "../modules/search.js";
import { saveTrackedPerson, getTrackedPersons, clearTrackedPersons } from "../modules/tracking.js";
import { renderResults, renderTrackedList, showDetails, closeModal } from "../modules/ui.js";
import { cleanData } from "../modules/data.js";

let items = [];
let currentKeyword = "";
let currentSort = "default";

if (document.querySelector("#search-form")) {
  const searchForm = document.querySelector("#search-form");
  const searchInput = document.querySelector("#search-input");
  const resultsContainer = document.querySelector("#results");
  const sortSelect = document.querySelector("#sort-select");

  searchForm.addEventListener("submit", async e => {
    e.preventDefault();
    resultsContainer.innerHTML = "<p>Loading...</p>";
    currentKeyword = searchInput.value.trim();
    items = await fetchWantedList();
    if (!items.length) {
      resultsContainer.innerHTML = "<p>Failed to load data. Try again later.</p>";
      return;
    }
    const cleanedItems = cleanData(items);
    const filteredItems = filterResults(cleanedItems, currentKeyword);
    const sortedItems = sortResults(filteredItems, currentSort);
    renderResults(sortedItems, resultsContainer);
  });

  sortSelect?.addEventListener("change", () => {
    currentSort = sortSelect.value;
    const cleanedItems = cleanData(items);
    const filteredItems = filterResults(cleanedItems, currentKeyword);
    const sortedItems = sortResults(filteredItems, currentSort);
    renderResults(sortedItems, resultsContainer);
  });

  resultsContainer.addEventListener("click", e => {
    const title = e.target.dataset.title;
    if (!title) return;
    const person = items.find(item => item.title === title);
    if (!person) return;
    if (e.target.classList.contains("track-btn")) {
      saveTrackedPerson(person);
    } else if (e.target.classList.contains("details-btn")) {
      showDetails(person);
    }
  });

  document.querySelector("#close-modal")?.addEventListener("click", closeModal);
}

if (document.querySelector("#tracked-section")) {
  const trackedContainer = document.querySelector("#tracked-list");
  const clearAllBtn = document.querySelector("#clear-all");

  const tracked = getTrackedPersons();
  renderTrackedList(tracked, trackedContainer);

  clearAllBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear all tracked persons?")) {
      clearTrackedPersons();
      renderTrackedList([], trackedContainer);
    }
  });
}