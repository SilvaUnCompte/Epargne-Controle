const email = '<%=Session["email"]%>'

const account_list = document.getElementById("selected-checking-account");
const selected_month = document.getElementById("selected-month");
const datasheet = document.getElementById("datasheet");
const additional_operation = document.getElementById("additional-operation");

let selected_account;
let operation_type_list = [];
let accounts = [];

onload = () => {
    fill_account_lists();
    set_operation_type_list();
    selected_month.valueAsDate = new Date();
    account_list.addEventListener("change", update_datasheet);
    selected_month.addEventListener("change", update_datasheet);
}

function fill_account_lists() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/database/api/get_accounts_by_user.php?email=" + email, true);
    xhr.onload = () => {
        if (xhr.status == 200) {
            accounts = JSON.parse(xhr.responseText);

            if (accounts.length == 0) {
                new_popup("There is no account yet", "info");
                document.getElementsByClassName("analytics-form")[0].disabled = true;
            }
            else {
                accounts.forEach(account => {
                    account_list.innerHTML += `<option value="${account.id_account}">${account.label}</option>`;
                });
            }
        }
        else {
            new_popup("Error getting accounts", "error");
        }
    };
    xhr.send();
}

function set_operation_type_list() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/database/api/get_operation_type_list.php?type=0", false);
    xhr.onload = () => {
        if (xhr.status == 200) {
            operation_type_list = JSON.parse(xhr.responseText);
        }
        else {
            new_popup("Error getting operation type list", "error");
        }
    };
    xhr.send();
}

function update_datasheet() {
    if (account_list.value == 0) {
        let tmp_html = "";
        for ($i = 0; $i < 14; $i++) {
            tmp_html += `
            <li class="table-row">
                <div class="col col-1" data-label="Date"> --- </div>
                <div class="col col-2" data-label="Label"> --- </div>
                <div class="col col-3" data-label="Amount"> --- </div>
                <div class="col col-4" data-label="Category"> --- </div>
                <div class="col col-5" data-label="Actions"></div>
            </li>`;
        }
        datasheet.innerHTML = tmp_html;
        selected_month.disabled = true;
        additional_operation.disabled = true;

        new_popup("Please select an account", "warn");
        return;
    }
    else {
        selected_month.disabled = false;
        additional_operation.disabled = false;
        selected_account = account_list.value;

        let start_str = selected_month.value + "-01";
        let end = new Date(start_str);
        end.setMonth(end.getMonth() + 1);
        end.setDate(end.getDate() - 1);
        end_str = end.toISOString().split('T')[0];

        datasheet.innerHTML = "";

        let xhr = new XMLHttpRequest();
        xhr.open("GET", `/database/api/get_operations_by_account.php?id_account=${account_list.value}&start=${start_str}&end=${end_str}]`, true);
        xhr.onload = () => {
            if (xhr.status == 200) {
                operations = JSON.parse(xhr.responseText);
                nb_operations = operations.length;

                if (nb_operations == 0) {
                    new_popup("There is no operation at this date", "info");
                    return;
                }

                for (let i = 0; i < nb_operations; i++) {

                    datasheet.innerHTML += `
                    <li class="table-row">
                        <div class="col col-1" data-label="Date"> ${operations[i].date} </div>
                        <div class="col col-2" data-label="Label"> ${operations[i].label} </div>
                        <div class="col col-3" data-label="Amount"> ${(operations[i].amount > 0 ? "+" : "") + operations[i].amount.toFixed(2)} € </div>
                        <div class="col col-4" data-label="Category"> ${operation_type_list[operations[i].category].title} </div>
                        <div class="col col-5" data-label="Actions">
                            <img src="/assets/images/trash.png" alt="delete" class="card-button" onclick="delete_element(${operations[i].id_operation})">
                        </div>
                    </li>`;

                    if (operations[i].amount > 0) {
                        datasheet.children[i].children[2].style.color = "green";
                    }
                    else {
                        datasheet.children[i].children[2].style.color = "black";
                    }
                }
            }
            else {
                new_popup("Error getting operations code #1", "error")
            }
        }
        xhr.send();
    }
}

function add_new_operation() {
    let new_operation = document.createElement("div");
    new_operation.classList.add("additional-operation");
    new_operation.innerHTML = `
        <div class="row-field">
            <div>
                <input type="text" name="label-additional-operation" class="label-additional-operation"
                    placeholder="Label">
                <input type="number" name="account-additional-operation" class="account-additional-operation" placeholder="Amount"> €
            </div>
            <img src="/assets/images/trash.png" class="button" alt="delete" class="card-button"
                onclick="remove_new_operation(this)">
        </div>
    `;

    document.getElementById("additional-operation-section").appendChild(new_operation);
}

function remove_new_operation(self) {
    self.parentNode.remove();
    update_checking_account_chart();
}