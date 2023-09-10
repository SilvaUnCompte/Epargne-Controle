
function showCompanyData(identifiant) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/database/api/company-research.php?id="+identifiant, true);
    xhr.onload = () => {
        let response = JSON.parse(xhr.responseText);
        let html = "";
        html += "<p id=\"identifiant\">"+identifiant+"</p>";
        html += "<h2>"+response.name+"</h2>";
        html += "<h4>Confiance du pilote : "+response.pilot_trust+"</h4>";
        html += "<h4>Note moyenne : "+ response.avrage +"</h4>";
        html += "<h4>Secteur principal : </h4>";
        html += "<h6>"+response.sectors[0]+"</h6>"; 
        html += "<h4>Localisation principal : </h4>";
        html += "<h6>"+response.locations['street_address'] + ", " + response.locations['postal_code'] + " " + response.locations['city'] +"</p>"; 
        html += "<h4>Description : </h4>";
        html += "<h6>"+response.desc+"</h6>"; 
        html += "<h3>Notez cette entreprise : </br> <input id=\"grade-entry\" placeholder=\"/5\" name=\"grade\" type=\"number\" min=\"0\" max=\"5\"><button class=\"btn_model_animated\" id=\"grade-button\" onclick=\"addGrade()\">Noter</button></h3>"

        document.getElementById("card_infos").innerHTML = html;
    };
    xhr.send();
}

function deleteCompany(identifiant){
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/database/api/company-deleting.php?id="+identifiant, true);
    xhr.onload = () => {window.location.reload();};
    xhr.send();
}