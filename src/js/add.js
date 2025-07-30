/** Moment 3 DT207G
 * Av Ramona Reinholdz
 * rare2400
 */
"use strict";

//hämtar formulärlement och ger api-urlen en variabel
const form = document.getElementById("add-experience");
const url = "https://rare2400-cvapi.onrender.com/api/workexperience";

//Eventlyssnare för formuläret vid tryck på "lägg till"
form.addEventListener("submit", async (event) => {
    event.preventDefault();

    //Objekt för att lagra datan från formuläret
    const newExperience = {
        companyName: form.companyName.value,
        jobTitle: form.jobTitle.value,
        location: form.location.value,
        startDate: form.startDate.value,
        endDate: form.endDate.value,
        description: form.description.value,
    };

    try {
        //POST-anrop till API:et med den nya erfarenheten
        const response = await fetch(url, {
            method: "POST",
            //talar om och skickar datan i JSON-format
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newExperience),
        });

        //felmeddelande om något går fel
        if (!response.ok) {
            throw new Error("Error adding experience: " + response.statusText);
        }

        //omvandlar svaret till JSON-format
        const results = await response.json();

        //loggar och skickar lyckat resultat till användaren
        console.log("Experience added successfully:", results);

        const added = document.getElementById("message");
        added.innerHTML = "";

        const text = document.createElement("p");
        text.textContent = "Erfarenheten har lagts till.";

        const link = document.createElement("a");
        link.href = "index.html";
        link.textContent = "Se ditt CV";

        added.appendChild(text);
        added.appendChild(link);

        added.classList.add("visible");

        setTimeout(() => {
            added.classList.remove("visible");
        }, 6000);

        //återställer formuläret
        form.reset();
    } catch (error) {
        //loggar och skickar misslyckat resultat till användaren
        console.error("Error:", error);
        alert("Något gick fel. Försök igen.");
    }
});