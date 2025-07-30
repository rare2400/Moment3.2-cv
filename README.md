# CV Frondend-applikation
En enkelt frontend-applikation som hanterar arbetserfarenheter i ett CV. Den använder HTML, JavaScript, Parcel och SASS (SCSS), samt är kopplad till en RESTful 
webbtjänst. API:et erhåller data genom MongoDB som en dokumentdatabas (se [CV API](https://rare2400-cvapi.onrender.com/api/workexperience) och [API repo](https://github.com/rare2400/Moment3.2-api) ). 

## Funktioner
- Lista befintliga arbetserfarenheter
- Lägga till ny arbetserfarenhet via formulär 
- Radera erfarenhet
- Responsiv design
- SCSS för förbättrad struktur av CSS
- Kommunicerar med API via `fetch`:
```js
async function getData() {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Error fetching data: " + response.statusText);
        }
        const data = await response.json();
        displayCV(data);
    } catch (err) {
        console.error("Error:", err);
    }
}
```

## Verktyg
- HTML5
- JavaScript
- Parcel
- SASS/SCSS
- REST API (egen webbtjänst)

## Installation
1. **Klona repot:**
```bash
git clone https://github.com/rare2400/Moment3.2-cv.git
cd Moment3.2-cv
```

2. **Installera paket:**
```bash
npm install
```

3. **starta utvecklingsserver:**
```bash
npm run start
```

4. **Applikation körs på** `http://localhost:1234`

## Bygga för produktion
```bash
npm run build
```

## Skapad av
Skapad som en del av en skolupppgift   
Mittuniversitetet, Webbutvecklingsprogrammet    
Ramona Reinholdz      
[rare2400@student.miun.se](rare2400@student.miun.se)      
2025-07-29
