/** Moment 3 DT207G
 * Av Ramona Reinholdz
 * rare2400
 */
"use strict";

//hämtar url för webbtjänsten
const url = "https://rare2400-cvapi.onrender.com/api/workexperience";

//kör funktion för att hämta data
getData();

//hämtar cv-datan från webbtjänsten
async function getData() {
    try {
        //hämtar data från webbtjänsten
        const response = await fetch(url);

        //felmeddelande om något går fel
        if (!response.ok) {
            throw new Error("Error fetching data: " + response.statusText);
        }
        //omvandlar svaret till JSON-format och skickar med det till displayCV
        const data = await response.json();
        displayCV(data);
    } catch (err) {
        console.error("Error:", err);
    }
}

//skriver ut data i lista
function displayCV(workexperiences) {
    //hämtar elementet där listan ska skrivas ut
    const experienceList = document.getElementById("cv-list");

    //tömmer lista
    experienceList.innerHTML = "";

    //visar felmeddelande för användaren om det inte finns erfarenheter
    if (workexperiences.length === 0) {
        const errMessage = document.createElement("p");
        errMessage.textContent = "Det finns inga erfarenheter att visa.";
        experienceList.appendChild(errMessage);
        return;
    }

    //loopar igenom varje erfarenhet och skapar ett div-element för varje
    workexperiences.forEach((experiences) => {
        const experienceItem = document.createElement("div");
        experienceItem.classList.add("experience-item");

        //skapar rubrik för erfarenheten
        const title = document.createElement("h3");
        title.textContent = `${experiences.jobTitle} - ${experiences.companyName}`;

        //skapar p-element för erfarenhetens information (plats, period och beskrivning)
        const location = document.createElement("p");
        location.textContent = `Plats: ${experiences.location}`;

        const period = document.createElement("p");

        if (experiences.endDate) {
            const startDate = new Date(experiences.startDate).toLocaleDateString();
            const endDate = new Date(experiences.endDate).toLocaleDateString();
            period.textContent = `Period: ${startDate} - ${endDate}`;
        } else {
            const startDate = new Date(experiences.startDate).toLocaleDateString();
            period.textContent = `Period: ${startDate} - pågående`;
        }

        const description = document.createElement("p");
        description.textContent = `Arbetsbeskrivning: ${experiences.description}`;

        //skapar div-container för knapparna
        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-container");

        //knapp med eventlyssnare för att radera en erfarenhet
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Ta bort";
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", () => {
            deleteExperience(experiences._id);
        });

        //lägger till knapp i div-container
        buttonContainer.appendChild(deleteButton);

        //lägger till allt i div-elementet
        experienceItem.appendChild(title);
        experienceItem.appendChild(location);
        experienceItem.appendChild(period);
        experienceItem.appendChild(description);
        experienceItem.appendChild(buttonContainer);

        //lägger till div-elementet i listan
        experienceList.appendChild(experienceItem);
    });
}


//radera en erfarenhet
async function deleteExperience(_id) {
    try {
        //skickar DELETE-anrop till API:et med id:t för erfarenheten som ska raderas
        const response = await fetch(`${url}/${_id}`, {
            method: "DELETE",
        });
        //felmeddelande om något går fel
        if (!response.ok) {
            throw new Error("Error deleting experience: " + response.statusText);
        }

        showMessage("Erfarenheten har tagits bort.");
        
        //hämtar uppdaterad data från webbtjänsten
        getData();
    } catch (error) {
        console.error("Error:", error);
    }
}

function showMessage(text, duration = 3000) {
    const messageContainer = document.getElementById("delete-message");
    const messageText = document.getElementById("message-text");
    const closeBtn = document.getElementById("close-message");

    messageText.textContent = text;
    messageContainer.classList.remove("hidden");

    closeBtn.onclick = () => {
        messageContainer.classList.add("hidden");
    };

    setTimeout(() => {
        messageContainer.classList.add("hidden");
    }, duration);
}