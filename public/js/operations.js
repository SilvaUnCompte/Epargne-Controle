const email = '<%=Session["email"]%>'
const datasheet = document.getElementById("datasheet");
const date_to_search = document.getElementById("date-to-search");
const operation_date = document.getElementById("operation_date");
const account_list = document.getElementById("selected-account");
const add_field = document.getElementById("add-field");
let accounts = [];

onload = () => {
    fill_account_list();
    date_to_search.valueAsDate = new Date();
    operation_date.valueAsDate = new Date();
}

// Datasheet

function delete_element(element_id) {
    if (confirm("Are you sure you want to delete this operation ?")) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/controler/deleting_elements/operation.php?id=" + element_id, true);
        xhr.onload = () => {
            if (xhr.status == 200) {
                update_datasheet();
            }
            else {
                alert("Error deleting operation");
            }
        }
        xhr.send();
    }
}

function datasheet_clear() {
    for (let i = 0; i < 14; i++) {
        datasheet.children[i].children[0].innerHTML = "---";
        datasheet.children[i].children[1].innerHTML = "---";
        datasheet.children[i].children[2].innerHTML = "---";
        datasheet.children[i].children[3].innerHTML = "---";
        datasheet.children[i].children[4].innerHTML = "";
        datasheet.children[i].style.color = "black";
    }
}

function update_datasheet() {
    add_field.style.display = "flex";
    date = date_to_search.value;
    datasheet_clear();

    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/database/api/get_operations_by_accounts.php?accounts=" + accounts + "&limit=14&date=" + date + "&regularity=0", true);
    xhr.onload = () => {
        if (xhr.status == 200) {
            operations = JSON.parse(xhr.responseText);
            nb_operations = operations.length;

            for (let i = 0; i < nb_operations; i++) {
                if (operations[i].amount > 0) {
                    datasheet.children[nb_operations - i - 1].children[2].style.color = "green";
                }
                else {
                    datasheet.children[nb_operations - i - 1].children[2].style.color = "black";
                }
                datasheet.children[nb_operations - i - 1].children[0].innerHTML = operations[i].date;
                datasheet.children[nb_operations - i - 1].children[1].innerHTML = operations[i].label;
                datasheet.children[nb_operations - i - 1].children[2].innerHTML = (operations[i].amount > 0 ? "+" : "") + operations[i].amount.toFixed(2) + " €";
                datasheet.children[nb_operations - i - 1].children[3].innerHTML = operations[i].category == 0 ? "Groceries" : operations[i].category == 1 ? "Leisure" : operations[i].category == 2 ? "Rent & utilities" : operations[i].category == 3 ? "Health" : operations[i].category == 4 ? "Shopping" : "Other";

                datasheet.children[nb_operations - i - 1].children[4].innerHTML = '<img src="/assets/images/trash.png" alt="delete" class="card-button" onclick="delete_element(' + operations[i].id_operation + ')">';
            }
        }
        else {
            alert("Error getting operations code #1");
        }
    }
    xhr.send();
}

function fill_account_list() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/database/api/get_accounts_by_user.php?email=" + email, true);
    xhr.onload = () => {
        if (xhr.status == 200) {
            accounts = xhr.responseText;
            let accounts_list = JSON.parse(accounts);
            if (accounts_list.length == 0) {
                document.getElementById("add-field").disabled = true;
            }

            accounts_list.forEach(account => {
                account_list.innerHTML += `<option value="${account.id_account}">${account.label}</option>`;
            });

            update_datasheet();
        }
        else {
            alert("Error getting accounts");
        }
    };
    xhr.send();
}

function creating_operation_pannel() {
    if (account_list.value > 0) {
        add_field.style.transform = "translate(0, 0)";
        add_field.style.opacity = "1";
    }
    else {
        add_field.style.transform = "";
        add_field.style.opacity = "";
    }
}

function create_operation() {
    label = document.getElementById("label").value;
    if (label.length > 50) {
        label = label.substring(0, 47) + "...";
    }
    amount = document.getElementById("amount").value;
    category = document.getElementById("category").value;

    if (amount == "" || label == "" || operation_date.value == "") {
        alert("Please fill all the fields");
    }
    else {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/controler/creating_elements/operation.php?id_account=" + account_list.value +
            "&label=" + label +
            "&amount=" + amount +
            "&category=" + category +
            "&date=" + operation_date.value, true);
        xhr.onload = () => {
            if (xhr.status == 200) {
                update_datasheet();
                document.getElementById("label").value = "";
                document.getElementById("amount").value = "";
                document.getElementById("category").value = 0;
            }
            else {
                alert("Unknow error creating operations");
            }
        };
        xhr.send();
    }
}