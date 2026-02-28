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
      lat: data[0].lat,
      lon: data[0].lon
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

  const latNum = Number(lat);
  const lonNum = Number(lon);

  mapContainer.innerHTML = `
    <iframe
      width="100%"
      height="450"
      style="border:0"
      src="https://www.openstreetmap.org/export/embed.html?bbox=${lonNum-0.01}%2C${latNum-0.01}%2C${lonNum+0.01}%2C${latNum+0.01}&layer=mapnik&marker=${latNum}%2C${lonNum}">
    </iframe>
  `;
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