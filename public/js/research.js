import('/public/js/add_field/show_offer_data.js');
import('/public/js/add_field/show_company_data.js');

function search() {
    url = "?st=" +
        document.querySelector('input[name="st"]:checked').value +
        "&sc=" + document.getElementById("search-bar").value;
    document.location.href = url;
}

document.getElementById("close-filters-button").addEventListener("click", () => {
    document.getElementById("filters_column").style.display = "none";
    document.getElementById("show_filters_button").style.display = "block";
    // document.getElementById("first_row").style.justifyContent = "space-around";
});

document.getElementById("show_filters_button").addEventListener("click", () => {
    document.getElementById("show_filters_button").style.display = "none";
    document.getElementById("filters_column").style.display = "flex";
    // document.getElementById("first_row").style.justifyContent = "space-between";
});

const elements = document.querySelectorAll(".wrapper");
const urlParams = new URLSearchParams(window.location.search);
const researchType = urlParams.get('st');
elements.forEach(elements => {
    elements.addEventListener("click", (event) => {
        document.getElementById("card_info_showing").style.display = "flex";
        if (researchType == 0) {
            showOfferData(elements.getAttribute('value'));
        } else if (researchType == 1) {
            showCompanyData(elements.getAttribute('value'));
        }
    });
})

try{
    document.getElementById("delete-button").addEventListener('click', () => {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('st') == 0) {
            deleteOffer(parseInt(document.getElementById("identifiant").innerHTML), urlParams.get('st'));
        } else if (urlParams.get('st') == 1) {
            deleteCompany(parseInt(document.getElementById("identifiant").innerHTML), urlParams.get('st'));
        }
    })
} catch (e) {}

try{
    document.getElementById("modify-button").addEventListener('click', () => {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('st') == 0) {
            location.href = "/controler/pages/edit_internship.php?id=" + parseInt(document.getElementById("identifiant").innerHTML);
        } else if (urlParams.get('st') == 1) {
            location.href = "/controler/pages/edit_company.php?id=" + parseInt(document.getElementById("identifiant").innerHTML);
        }
    })
} catch (e) {}

try{
document.getElementById("postuler-button").addEventListener('click', () => {
    if (confirm('Êtes-vous sur de vouloir postuler ?')) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "/database/api/postulation.php?id=" + parseInt(document.getElementById("identifiant").innerHTML), true);
        xhr.send();
    }
})
} catch (e) {}

function addGrade() {
    let xhr = new XMLHttpRequest();
    grade = parseInt(document.getElementById('grade-entry').value);
    grade = grade > 5 ? 5 : grade;
    grade = grade < 0 ? 0 : grade;

    xhr.open("GET", "/database/api/grading.php?id=" + document.getElementById("identifiant").innerHTML + "&grade=" + grade, true);
    xhr.onload = () => {window.location.reload()}
    xhr.send();
}