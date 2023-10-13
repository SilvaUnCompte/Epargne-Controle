const email = '<%=Session["email"]%>'
const datasheet = document.getElementById("datasheet");
const date = document.getElementById("date");
const amount = document.getElementById("amount");
const label = document.getElementById("label");
let transfer_data = [null, null];

onload = () => {
    date.valueAsDate = new Date();
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/database/api/get_accounts_by_user.php?email=" + email, true);
    xhr.onload = () => {
        if (xhr.status == 200) {
            let accounts = JSON.parse(xhr.responseText);

            if (accounts.length == 0) {
                datasheet.innerHTML = `<li class="table-row">
                        <div class="col col-1" data-label="Label"> --- </div>
                        <div class="col col-2" data-label="Sold"> --- </div>
                        <div class="col col-3" data-label="Type"> --- </div>

                        <div class="col col-4" data-label="Actions"> </div>
                    </tr>`;
                new_popup("There is no account yet", "info");
                return;
            }

            accounts.forEach(account => {
                datasheet.innerHTML += `
                    <li id="card-${account.id_account}" onclick="manage_account_transfer(${account.id_account})" class="table-row">
                        <div class="col col-1" data-label="Label"> ${account.label} </div>
                        <div class="col col-2" data-label="Sold"> ${account.sold.toFixed(2)} € </div>
                        <div class="col col-3" data-label="Type"> ${account.type ? "Savings account" : "Checking account"} </div>

                        <div class="col col-4" data-label="Actions">
                            <img src="/assets/images/edit.png" alt="edit" class="card-button" onclick="edit_element(${account.id_account})">
                            <img src="/assets/images/trash.png" alt="delete" class="card-button" onclick="delete_element(${account.id_account})">
                        </div>
                    </tr>`;
            });
        }
        else {
            new_popup("Error getting accounts", "error")
        }
    };
    xhr.send();
}

function manage_account_transfer(id) {
    if ((transfer_data[0] == id) || (transfer_data[1] == id)) {
        document.getElementById("card-" + id).style = "";

        if (transfer_data[0] == id) {
            transfer_data[0] = null;
        }
        else {
            transfer_data[1] = null;
        }
    }
    else if (transfer_data[0] == null) {
        transfer_animation_on(id, 0)
        transfer_data[0] = id;
    }
    else if (transfer_data[1] == null) {
        transfer_animation_on(id, 1)
        transfer_data[1] = id;
    }

    document.getElementById("transfer-field").disabled = ((transfer_data[0] == null) || (transfer_data[1] == null));
}

function transfer_animation_on(id, postion) {
    let card = document.getElementById("card-" + id);

    // get postion balise from-account
    let from_account_position = document.getElementById(`selected-account-${postion}`).getBoundingClientRect();
    let card_position = card.getBoundingClientRect();

    // make diff
    let x = from_account_position.x - card_position.x;
    let y = from_account_position.y - card_position.y;

    card.style.transform = `translate(${x}px, ${y}px)`;

    // Adapte size
    card.style.width = "90%";
}

function process_transfer() {
    if (transfer_data[0] == null || transfer_data[1] == null || date.value == "" || amount.value == "") {
        new_popup("Please fill all fields", "warn");
    }
    else {
        label_val = label.value == "" ? "Transfer" : label.value;

        var xhr = new XMLHttpRequest();
        xhr.open("GET", `/controler/creating_elements/transaction.php?from=${transfer_data[0]}&to=${transfer_data[1]}&label=${label_val}&date=${date.value}&amount=${amount.value}`, true);
        xhr.onload = () => {
            if (xhr.status == 200) {
                new_popup("Transaction process", "success");
                undo_transfer();
            }
            else {
                new_popup("Error process transaction", "error")
            }
        }
        xhr.send();
    }
}

function undo_transfer() {
    if (transfer_data[0] != null) {
        document.getElementById("card-" + transfer_data[0]).style = "";
    }
    if (transfer_data[1] != null) {
        document.getElementById("card-" + transfer_data[1]).style = "";
    }
    transfer_data = [null, null];
    document.getElementById("transfer-field").disabled = true;
    label.value = "";
    amount.value = "";
}

window.addEventListener('resize', undo_transfer());