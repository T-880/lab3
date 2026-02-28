import '../scss/main.scss';

/**
 * Hämtar koordinater från Nominatim API baserat på sökterm.
 * @async
 * @function fetchCoordinates
 * @param {string} location - Platsen som användaren söker efter
 * @returns {Promise<{lat: string, lon: string} | null>}
 */
async function fetchCoordinates(location) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`
    );

    if (!response.ok) {
      throw new Error("Fel vid hämtning av koordinater");
    }

    const data = await response.json();

    if (data.length === 0) {
      return null;
    }

    return {
      lat: parseFloat(data[0].lat),
      lon: parseFloat(data[0].lon)
    };

  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * Visar karta med markör via OpenStreetMap.
 * @function showMap
 * @param {string} lat
 * @param {string} lon
 */
function showMap(lat, lon) {
  const mapContainer = document.getElementById("mapContainer");

mapContainer.innerHTML = "";

 const map = L.map(mapContainer).setView([lat, lon], 13);

 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  L.marker([lat, lon]).addTo(map)
    .bindPopup("Sökplats")
    .openPopup();
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("mapForm");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const input = document.getElementById("locationInput").value;

    const coordinates = await fetchCoordinates(input);

    if (!coordinates) {
      alert("Platsen hittades inte.");
      return;
    }

    showMap(coordinates.lat, coordinates.lon);
  });
});