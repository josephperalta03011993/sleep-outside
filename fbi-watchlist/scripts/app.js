import { fetchWantedList } from "../modules/api.js";
import { filterResults } from "../modules/search.js";
import { saveTrackedPerson, getTrackedPersons, clearTrackedPersons } from "../modules/tracking.js";
import { renderResults, renderTrackedList } from "../modules/ui.js";
import { cleanData } from "../modules/data.js";

if (document.querySelector("#search-form")) {
  // Index page logic
  const searchForm = document.querySelector("#search-form");
  const searchInput = document.querySelector("#search-input");
  const resultsContainer = document.querySelector("#results");

  searchForm.addEventListener("submit", async e => {
    e.preventDefault();
    const keyword = searchInput.value.trim();
    const items = await fetchWantedList();
    const cleanedItems = cleanData(items);
    const filteredItems = filterResults(cleanedItems, keyword);
    renderResults(filteredItems, resultsContainer);
  });

  resultsContainer.addEventListener("click", e => {
    if (e.target.classList.contains("track-btn")) {
      const title = e.target.dataset.title;
      const items = JSON.parse(JSON.stringify(cleanData(items))); // Deep copy
      const person = items.find(item => item.title === title);
      if (person) saveTrackedPerson(person);
    }
  });
}

if (document.querySelector("#tracked-section")) {
  // Tracked page logic
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