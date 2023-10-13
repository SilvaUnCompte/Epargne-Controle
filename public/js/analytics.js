const email = '<%=Session["email"]%>'
const datasheet = document.getElementById("datasheet");
let accounts = [];


onload = () => {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/database/api/get_accounts_by_user.php?email=" + email, true);
    xhr.onload = () => {
        if (xhr.status == 200) {
            accounts = JSON.parse(xhr.responseText);

            if (accounts.length == 0) {
                new_popup("There is no account yet", "info");
                return;
            }

            // accounts.forEach(account => {
                
            // });
        }
        else {
            new_popup("Error getting accounts", "error");
        }
    };
    xhr.send();
}

function select(id) {
    let card = document.getElementById("card-" + id);
    card.style.backgroundColor = "#2ecc71";
    card.style.color = "white";
    card.style.fontWeight = "bold";
    card.style.fontSize = "20px";
    card.style.borderRadius = "10px";
    card.style.padding = "10px";
    card.style.margin = "10px";
}