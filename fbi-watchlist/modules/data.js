// Clean API data by providing default values and stripping HTML from specific fields
export function cleanData(items) {
  return items.map(item => {
    // Strip HTML from fields that may contain tags
    const stripHTML = (str) => {
      if (!str) return str;
      const div = document.createElement("div");
      div.innerHTML = str;
      return div.textContent.trim().replace(/\s+/g, " ");
    };

    return {
      title: item.title || "N/A",
      description: stripHTML(item.description) || "N/A",
      images: item.images || [],
      subjects: item.subjects || [],
      caution: stripHTML(item.caution) || "N/A",
      sex: item.sex || "N/A",
      nationality: item.nationality || "N/A",
      reward: item.reward || "N/A",
      uid: item.uid || null
    };
  });
}