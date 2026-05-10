import { NASA_API } from './config.js';
const NASA_API_KEY = NASA_API;

const btn = document.getElementById('travelBtn');
const loader = document.getElementById('loader');
const resultArea = document.getElementById('resultArea');
const dateInput = document.getElementById('dateInput');

// Setează data maximă automat ca fiind "astăzi" la încărcarea paginii
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('max', today);

btn.addEventListener('click', async () => {
    const chosenDate = dateInput.value;
    const minDate = "1995-06-16";
    
    // Validări
    if (!chosenDate) {
        alert("Te rog selectează o dată!");
        return;
    }

    if (chosenDate < minDate) {
        alert("Arhiva NASA începe pe 16 Iunie 1995. Te rugăm să alegi o dată validă.");
        return;
    }

    if (chosenDate > today) {
        alert("Nu putem vedea viitorul... încă. Alege o dată din trecut.");
        return;
    }

    // Resetăm UI pentru noua căutare
    resultArea.style.opacity = '0';
    loader.style.width = '30%';

    const dateObj = new Date(chosenDate);
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();

    try {
        // 1. APEL NASA 
        const nasaRes = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&date=${chosenDate}`);
        const nasaData = await nasaRes.json();
        
        if (nasaData.error) throw new Error(nasaData.error.message);

        loader.style.width = '60%';

        // 2. APEL ISTORIE (Numbers API)
        let historyText = `O zi interesantă în istoria universului (${day}/${month}).`;
        
        try {
            const historyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(`http://numbersapi.com/${month}/${day}/date?json`)}`;
            const historyRes = await fetch(historyUrl);
            const historyDataRaw = await historyRes.json();
            const historyData = JSON.parse(historyDataRaw.contents);
            historyText = historyData.text;
        } catch (hError) {
            console.warn("Numbers API a eșuat, folosim mesaj default.", hError);
        }

        // AFIȘARE DATE
        const imgElement = document.getElementById('nasaImage');
        if (nasaData.media_type === "image") {
            imgElement.src = nasaData.url;
        } else {
            // Fallback dacă NASA pune video
            imgElement.src = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000";
        }
        
        document.getElementById('nasaTitle').innerText = nasaData.title || "Cosmic Moment";
        
        // Resetăm scroll-ul descrierii și populăm textul
        const descElement = document.getElementById('nasaDescription');
        descElement.innerText = nasaData.explanation || "Fără descriere disponibilă.";
        descElement.scrollTop = 0; 

        document.getElementById('historyFact').innerText = historyText;

        // Finalizare animație
        loader.style.width = '100%';
        setTimeout(() => {
            loader.style.width = '0%';
            resultArea.style.display = 'block';
            setTimeout(() => { resultArea.style.opacity = '1'; }, 50);
        }, 500);

    } catch (error) {
        console.error("Eroare generală:", error);
        loader.style.width = '0%';
        alert("Eroare: " + error.message);
    }
});