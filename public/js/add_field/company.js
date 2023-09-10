let locations = [];
let sectors = [];

function confirm(){
    alert(document.getElementById("input-name").value + " a bien été créé.");
}

function add_location() {
    const input_street = document.getElementById("input_street");
    const input_city = document.getElementById("input_city");
    const input_postal = document.getElementById("input_postal");

    if (input_street.value == "" || input_city.value == "" || input_postal.value == "") {
        alert("Veuillez remplir tous les champs");
        return;
    }
    let  randomId = Math.floor(Math.random() * 90000)

    let  html = "<div class='entry-element entry-location'>";
    html += "<p>" + input_street.value + " " + input_city.value + " " + input_postal.value + "</p>";
    html += "<button type=\"button\" id=\"field_" + randomId + "\" class=\"add-button\" onclick=\"delete_field(" + randomId + ")\">-</button>"
    html += "</div>";

    document.getElementById("entry-address").innerHTML += html;

    locations.push([randomId, input_street, input_city, input_postal]);
};

function add_sector() {
    const input_sector = document.getElementById("input_sector");
    if (input_sector.value == "") {
        alert("Veuillez remplir tous les champs");
        return;
    }
    let randomId = Math.floor(Math.random() * 90000)

    let html = "<div class='entry-element entry-sector'>";
    html += "<p>" + input_sector.value + "</p>";
    html += "<button type=\"button\" id=\"field_" + randomId + "\" class=\"add-button\" onclick=\"delete_field(" + randomId + ")\">-</button>"
    html += "</div>";

    document.getElementById("entry-sector").innerHTML += html;

    sectors.push([randomId, input_sector]);
};

function delete_field(id) {
    document.getElementById("field_" + id).parentElement.remove();
    let n = 0;
    sectors.forEach(element => {
        if(element[0] == id)sectors.splice(n, 1);
        n += 1;
    });
    n = 0;
    locations.forEach(element => {
        if(element[0] == id)locations.splice(n, 1);
        n += 1;
    });
};

function clear_field() {
    let field = document.getElementsByClassName("entry-element");
    console.log(field);
    while (0 < field.length) {
        field[0].remove();
    }
    locations = [];
    sectors = [];
};