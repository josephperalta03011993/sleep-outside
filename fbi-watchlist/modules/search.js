export function filterResults(items, keyword) {
  if (!keyword) return items;
  const lowerKeyword = keyword.toLowerCase();
  return items.filter(item => {
    const title = item.title?.toLowerCase() || "";
    const description = item.description?.toLowerCase() || "";
    const subjects = item.subjects?.map(s => s.toLowerCase()) || [];
    return title.includes(lowerKeyword) ||
           description.includes(lowerKeyword) ||
           subjects.includes(lowerKeyword);
  });
}