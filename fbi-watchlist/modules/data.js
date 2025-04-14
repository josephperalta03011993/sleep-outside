export function cleanData(items) {
  return items.map(item => ({
    title: item.title || "Unknown",
    description: item.description || "No description",
    images: item.images || [],
    subjects: item.subjects || [],
    caution: item.caution || "N/A"
  }));
}