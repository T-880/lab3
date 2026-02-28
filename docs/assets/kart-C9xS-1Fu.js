import"./main-CEiFkomo.js";async function a(o){try{const t=await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(o)}`);if(!t.ok)throw new Error("Fel vid hämtning av koordinater");const e=await t.json();return e.length===0?null:{lat:e[0].lat,lon:e[0].lon}}catch(t){return console.error(t),null}}function m(o,t){const e=document.getElementById("mapContainer"),n=Number(o),r=Number(t);e.innerHTML=`
    <iframe
      width="100%"
      height="450"
      style="border:0"
      src="https://www.openstreetmap.org/export/embed.html?bbox=${r-.01}%2C${n-.01}%2C${r+.01}%2C${n+.01}&layer=mapnik&marker=${n}%2C${r}">
    </iframe>
  `}document.addEventListener("DOMContentLoaded",()=>{document.getElementById("mapForm").addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("locationInput").value,n=await a(e);if(!n){alert("Platsen hittades inte.");return}m(n.lat,n.lon)})});
