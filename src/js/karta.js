import '../scss/main.scss';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

/**
 * Hämtar koordinater för en plats via Nominatim API.
 * @async
 * @function fetchCoordinates
 * @param {string} location - Namnet på platsen som användaren söker.
 * @returns {Promise<{lat: number, lon: number} | null>} Objekt med latitude och longitude eller null om platsen inte hittas.
 */
async function fetchCoordinates(location) {
    try {
        const res = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`
        );
        const data = await res.json();

        if (!data.length) return null;

        return {
            lat: parseFloat(data[0].lat),
            lon: parseFloat(data[0].lon)
        };
    } catch (err) {
        console.error(err);
        return null;
    }
}

/**
 * Visar en Leaflet-karta och placerar en markör på angivna koordinater.
 * @function showMap
 * @param {number} lat - Latitud för platsen.
 * @param {number} lon - Longitud för platsen.
 */
function showMap(lat, lon) {
    const container = document.getElementById('mapContainer');
    container.innerHTML = '';

    const map = L.map(container).setView([lat, lon], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    L.marker([lat, lon]).addTo(map)
        .bindPopup('Sökplats')
        .openPopup();
}

/**
 * Initierar sökformuläret och hanterar användarinteraktion.
 */
document.addEventListener('DOMContentLoaded', () => {
    showMap(59.3293, 18.0686);

    const form = document.getElementById('mapForm');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const input = document.getElementById('locationInput').value.trim();
        if (!input) return;

        const coords = await fetchCoordinates(input);

        if (!coords) {
            alert('Platsen hittades inte.');
            return;
        }

        showMap(coords.lat, coords.lon);
    });
});