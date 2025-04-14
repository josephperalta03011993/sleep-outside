export async function fetchWantedList() {
  const cacheKey = "fbiWantedCache";
  const cacheTime = 24 * 60 * 60 * 1000; // 24 hours
  const cached = JSON.parse(localStorage.getItem(cacheKey) || "{}");

  if (cached.data && Date.now() - cached.timestamp < cacheTime) {
    return cached.data;
  }

  try {
    const response = await fetch("https://api.fbi.gov/wanted/v1/list");
    if (!response.ok) throw new Error("Failed to fetch data");
    const data = await response.json();
    localStorage.setItem(cacheKey, JSON.stringify({
      data: data.items || [],
      timestamp: Date.now()
    }));
    return data.items || [];
  } catch (error) {
    console.error("API Error:", error);
    return cached.data || [];
  }
}