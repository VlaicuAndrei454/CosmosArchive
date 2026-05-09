const NASA_API_KEY = CONFIG.NASA_API_KEY;

const btn = document.getElementById('travelBtn');
const loader = document.getElementById('loader');
const resultArea = document.getElementById('resultArea');

btn.addEventListener('click', async () => {
    const chosenDate = document.getElementById('dateInput').value;
    
    if (!chosenDate) {
        alert("Te rog selectează o dată!");
        return;
    }

    resultArea.style.opacity = '0';
    loader.style.width = '30%';

    const dateObj = new Date(chosenDate);
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();

    try {
        // 1. APEL NASA (Direct - de obicei nu are probleme de CORS)
        const nasaRes = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&date=${chosenDate}`);
        const nasaData = await nasaRes.json();
        
        if (nasaData.error) throw new Error(nasaData.error.message);

        loader.style.width = '60%';

        // 2. APEL ISTORIE (Cu mecanism de siguranță/Fallback)
        let historyText = `O zi interesantă în istoria universului (${day}/${month}).`;
        
        try {
            // Folosim un proxy diferit (cors-anywhere via demo sau allorigins)
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
            imgElement.src = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000";
        }
        
        document.getElementById('nasaTitle').innerText = nasaData.title || "Cosmic Moment";
        document.getElementById('nasaDescription').innerText = nasaData.explanation || "";
        document.getElementById('historyFact').innerText = historyText;

        loader.style.width = '100%';
        setTimeout(() => {
            loader.style.width = '0%';
            resultArea.style.opacity = '1';
            resultArea.style.display = 'block';
        }, 500);

    } catch (error) {
        console.error("Eroare generală:", error);
        loader.style.width = '0%';
        alert("NASA nu a putut găsi date pentru această dată sau cheia API este invalidă.");
    }
});