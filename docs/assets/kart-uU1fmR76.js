import"./modulepreload-polyfill-B5Qt9EMX.js";async function r(n){try{const t=await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(n)}`);if(!t.ok)throw new Error("Fel vid hämtning av koordinater");const e=await t.json();return e.length===0?null:{lat:e[0].lat,lon:e[0].lon}}catch(t){return console.error(t),null}}function a(n,t){const e=document.getElementById("mapContainer");e.innerHTML=`
    <iframe
      width="100%"
      height="450"
      style="border:0"
      src="https://www.openstreetmap.org/export/embed.html?bbox=${t-.01}%2C${n-.01}%2C${Number(t)+.01}%2C${Number(n)+.01}&layer=mapnik&marker=${n}%2C${t}">
    </iframe>
  `}document.addEventListener("DOMContentLoaded",()=>{document.getElementById("mapForm").addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("locationInput").value,o=await r(e);if(!o){alert("Platsen hittades inte.");return}a(o.lat,o.lon)})});
