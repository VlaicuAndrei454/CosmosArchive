# Cosmos Archive - Proiect Cloud Computing
**Student:** Vlaicu Andrei-Mirel 


### 🔗 Link-uri Proiect
- **Prezentare Video (YouTube):** 
- **Aplicație Publicată (GitHub Pages):** https://github.com/VlaicuAndrei454/CosmosArchive

---

## 1. Introducere
Aplicația **Cosmos Archive** este o platformă web interactivă care permite utilizatorilor să exploreze istoria universului și a omenirii la o dată specifică. Proiectul demonstrează integrarea serviciilor cloud prin utilizarea a două API-uri REST externe pentru a corela date astronomice cu evenimente istorice.

## 2. Descriere problemă
În contextul volumului imens de date disponibil în cloud, agregarea informațiilor din surse diferite (știință și istorie) oferă o perspectivă unică asupra timpului. Problema abordată este oferirea unei experiențe utilizator fluide (UX cinematic) care să preia date în timp real de la furnizori diferiți (NASA și Numbers API) și să le prezinte unitar, gestionând asincronicitatea și potențialele erori de rețea (CORS, latență).

## 3. Descriere API
Proiectul utilizează două servicii cloud de tip REST API:
1.  **NASA APOD (Astronomy Picture of the Day):** Furnizează imaginea astronomică a zilei și o explicație profesională scrisă de astronomi.
2.  **Numbers API:** Un serviciu care returnează curiozități și fapte istorice bazate pe numere sau date calendaristice.

## 4. Flux de date

### Metode HTTP și Request/Response
Ambele servicii sunt interogate folosind metoda **HTTP GET**.

**Exemplu Request NASA:**
`GET https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2004-06-16`

**Exemplu Response NASA (JSON):**
```json
{
  "date": "2004-06-16",
  "explanation": "Elliptical galaxy M87 is a type of galaxy that looks much different than our own Milky Way Galaxy...",
  "media_type": "image",
  "title": "Elliptical Galaxy M87",
  "url": "https://apod.nasa.gov/apod/image/0406/m87_cfht_big.jpg"
}