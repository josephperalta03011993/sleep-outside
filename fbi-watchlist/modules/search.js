// Filter items based on a keyword in title, description, or subjects
export function filterResults(items, keyword) {
  if (!keyword) return items;
  const lowerKeyword = keyword.toLowerCase();
  return items.filter(item => {
    const title = item.title?.toLowerCase() || "";
    const description = item.description?.toLowerCase() || "";
    const subjects = item.subjects?.map(s => s.toLowerCase()) || [];
    return title.includes(lowerKeyword) ||
           description.includes(lowerKeyword) ||
           subjects.some(subject => subject.includes(lowerKeyword)); // Check if any subject contains the keyword
  });
}

// Sort items by name (title) or crime (first subject), with a default option
export function sortResults(items, sortBy) {
  if (sortBy === "default") return items;
  const sorted = [...items]; // Avoid mutating original
  if (sortBy === "name") {
    return sorted.sort((a, b) => 
      (a.title || "N/A").localeCompare(b.title || "N/A")
    );
  }
  if (sortBy === "crime") {
    return sorted.sort((a, b) => {
      const aCrime = a.subjects?.[0] || "N/A";
      const bCrime = b.subjects?.[0] || "N/A";
      return aCrime.localeCompare(bCrime);
    });
  }
  return items; // Fallback for unknown sortBy values
}