export async function fetchWantedList() {
  try {
    const response = await fetch("https://api.fbi.gov/wanted/v1/list");
    if (!response.ok) throw new Error("Failed to fetch data");
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
}