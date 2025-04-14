export async function fetchWantedList() {
  const cacheKey = "fbiWantedCache";
  const cacheTime = 24 * 60 * 60 * 1000; // 24 hours
  const cached = JSON.parse(localStorage.getItem(cacheKey) || "{}");

  if (cached.data && Date.now() - cached.timestamp < cacheTime) {
    return cached.data;
  }

  try {
    const response = await fetch("https://api.fbi.gov/wanted/v1/list");
    if (!response.ok) throw new Error("Failed to fetch FBI data");
    const data = await response.json();
    localStorage.setItem(cacheKey, JSON.stringify({
      data: data.items || [],
      timestamp: Date.now()
    }));
    return data.items || [];
  } catch (error) {
    console.error("FBI API Error:", error);
    return cached.data || [];
  }
}

export async function fetchCountryDetails(nationality) {
  if (!nationality) return null;
  const cacheKey = "countriesCache";
  const cacheTime = 24 * 60 * 60 * 1000;
  const cached = JSON.parse(localStorage.getItem(cacheKey) || "{}");

  // Ensure cached.data exists before accessing
  if (cached.data && Date.now() - cached.timestamp < cacheTime) {
    const country = cached.data[nationality.toLowerCase()];
    return country || null;
  }

  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(nationality)}`);
    if (!response.ok) throw new Error("Failed to fetch country data");
    const data = await response.json();
    const country = data[0]; // Take first match (REST Countries may return multiple results)
    if (country) {
      const cacheData = cached.data || {};
      cacheData[nationality.toLowerCase()] = country;
      localStorage.setItem(cacheKey, JSON.stringify({
        data: cacheData,
        timestamp: Date.now()
      }));
    }
    return country || null;
  } catch (error) {
    console.error("Country API Error:", error);
    return null;
  }
}