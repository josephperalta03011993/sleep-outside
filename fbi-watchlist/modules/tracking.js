export function saveTrackedPerson(person) {
  const tracked = getTrackedPersons();
  tracked.push({
    title: person.title || "N/A",
    description: person.description || "N/A",
    image: person.images?.[0]?.thumb || "images/silhouette.webp",
    caution: person.caution || "N/A"
  });
  localStorage.setItem("trackedPersons", JSON.stringify(tracked));
}

export function getTrackedPersons() {
  return JSON.parse(localStorage.getItem("trackedPersons") || "[]");
}

export function clearTrackedPersons() {
  localStorage.removeItem("trackedPersons");
}