import"./main-CEiFkomo.js";async function i(o){try{const t=await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(o)}`);if(!t.ok)throw new Error("Fel vid hämtning av koordinater");const n=await t.json();return n.length===0?null:{lat:n[0].lat,lon:n[0].lon}}catch(t){return console.error(t),null}}function s(o,t){const n=document.getElementById("mapContainer"),e=parseFloat(o),r=parseFloat(t);if(isNaN(e)||isNaN(r)){alert("Ogiltiga koordinater");return}const a=`${r-.01},${e-.01},${r+.01},${e+.01}`;n.innerHTML=`
    <iframe
      width="100%"
      height="450"
      style="border:0"
      src="https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(a)}&layer=mapnik&marker=${e},${r}">
    </iframe>
  `}document.addEventListener("DOMContentLoaded",()=>{document.getElementById("mapForm").addEventListener("submit",async t=>{t.preventDefault();const n=document.getElementById("locationInput").value,e=await i(n);if(!e){alert("Platsen hittades inte.");return}s(e.lat,e.lon)})});
