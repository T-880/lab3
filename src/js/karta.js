import '../scss/main.scss';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


/**
 * GLOBALA VARIABLER
 * map: Leaflet-kartan
 * marker: Leaflet-markören
 */
let map;
let marker;

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
 * @function initMap
 * @param {number} lat - Latitud för platsen.
 * @param {number} lon - Longitud för platsen.
 * @param {string} [popupText='Sökplats'] - Text som ska visas i markörens popup.
 */
function initMap(lat, lon, popupText = 'Sökplats') {

    map = L.map('mapContainer').setView([lat, lon], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    marker = L.marker([lat, lon])
        .addTo(map)
        .bindPopup(popupText)
        .openPopup();
}
/**
 * Uppdaterar markören och centrerar kartan på nya koordinater.
 * @function updateMarker
 * @param {number} lat - Latitud för den nya platsen.
 * @param {number} lon - Longitud för den nya platsen.
 * @param {string} [popupText='Sökplats'] - Text som ska visas i markörens popup.
 */
function updateMarker(lat, lon, popupText = 'Sökplats') {
    if (marker && map) {
        marker.setLatLng([lat, lon]).setPopupContent(popupText).openPopup();
        map.setView([lat, lon], 13);
    }
}

/**
 * Initierar sökformuläret och hanterar användarinteraktion.
 */
document.addEventListener('DOMContentLoaded', () => {
    initMap(59.3293, 18.0686, 'Stockholm');

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

        updateMarker(coords.lat, coords.lon, input);
    });
});