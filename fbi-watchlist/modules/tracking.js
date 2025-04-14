// Save a person to the tracked list in Local Storage
export function saveTrackedPerson(person) {
  const tracked = getTrackedPersons();
  tracked.push({
    title: person.title || "N/A",
    description: person.description || "N/A",
    image: person.images?.[0]?.thumb || "images/silhouette.webp",
    caution: person.caution || "N/A",
    sex: person.sex || "N/A",
    nationality: person.nationality || "N/A",
    reward: person.reward || "N/A"
  });
  localStorage.setItem("trackedPersons", JSON.stringify(tracked));
}

// Retrieve the tracked persons list from Local Storage
export function getTrackedPersons() {
  return JSON.parse(localStorage.getItem("trackedPersons") || "[]");
}

// Clear all tracked persons from Local Storage
export function clearTrackedPersons() {
  localStorage.removeItem("trackedPersons");
}

// Remove a specific person from the tracked list by title
export function removeTrackedPerson(title) {
  const tracked = getTrackedPersons();
  const updated = tracked.filter(person => person.title !== title);
  localStorage.setItem("trackedPersons", JSON.stringify(updated));
  return updated; // Return updated list for immediate UI update
}