const email = document.getElementById("email").value;
const datasheet = document.getElementById("datasheet");
const datepicker = document.getElementById("date-to-search");
let accounts = [];

onload = () => {
    datepicker.valueAsDate = new Date();
    update_datasheet()
}

function datasheet_clear(){
    for (let i = 0; i < 14; i++) {
        datasheet.children[i].children[0].innerHTML = "---";
        datasheet.children[i].children[1].innerHTML = "---";
        datasheet.children[i].children[2].innerHTML = "---";
        datasheet.children[i].children[3].innerHTML = "---";
        datasheet.children[i].style.color = "black";
        datasheet.children[i].style.fontStyle = "normal";
    }
}

function update_datasheet(){
    date = datepicker.value;
    datasheet_clear();

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/database/api/get_accounts_by_user.php?email=" + email, true);
    xhr.onload = () => {
        if (xhr.status == 200) {
            accounts = xhr.responseText;

            var xhr2 = new XMLHttpRequest();
            xhr2.open("GET", "/database/api/get_operations_by_accounts.php?accounts=" + accounts + "&limit=14&date=" + date + "&regularity=0", true);
            xhr2.onload = () => {
                if (xhr2.status == 200) {
                    operations = JSON.parse(xhr2.responseText);
                    nb_operations = operations.length;

                    for (let i = 0; i < nb_operations; i++) {
                        if (operations[i].regularity > 0) {
                            datasheet.children[nb_operations-i-1].style.color = "grey";
                            datasheet.children[nb_operations-i-1].style.fontStyle = "italic";
                        }
                        else if (operations[i].amount > 0) {
                            datasheet.children[nb_operations-i-1].children[2].style.color = "green";
                        }
                        datasheet.children[nb_operations-i-1].children[0].innerHTML = operations[i].date;
                        datasheet.children[nb_operations-i-1].children[1].innerHTML = operations[i].label;
                        datasheet.children[nb_operations-i-1].children[2].innerHTML = (operations[i].amount > 0 ? "+" : "") + operations[i].amount.toFixed(2) + " €";
                        datasheet.children[nb_operations-i-1].children[3].innerHTML = operations[i].category == 0 ? "Groceries" : operations[i].category == 1 ? "Leisure" : operations[i].category == 2 ? "Rent" : operations[i].category == 3 ? "Health" : operations[i].category == 4 ? "Shopping" : "Other";
                    }
                }
                else {
                    alert("Error getting operations");
                }
            }
            xhr2.send();
        }
        else {
            alert("Error getting operations");
        }
    };
    xhr.send();
}