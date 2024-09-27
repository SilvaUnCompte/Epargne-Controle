const email = '<%=Session["email"]%>'
const datasheet = document.getElementById("datasheet");
const date_to_search = document.getElementById("date-to-search");
const operation_date = document.getElementById("operation_date");
const account_list = document.getElementById("selected-account");
const balance_view = document.getElementById("balance-view");
const balance = document.getElementById("balance");
const add_field = document.getElementById("add-field");
const select_category = document.getElementById("category");
let accounts = [];
let selected_account;
let operation_type_list = [];

onload = () => {
    set_operation_type_list();
    fill_account_list();
    add_notes();

    account_list.addEventListener("change", sync_account_selection);
    account_list.addEventListener("change", creating_operation_pannel);

    date_to_search.valueAsDate = new Date();
    operation_date.valueAsDate = new Date();
}

function sync_account_selection() {
    balance_view.value = account_list.value;
    selected_account = accounts.find(account => account.id_account == account_list.value)
    update_datasheet();
}

function add_notes() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    if (urlParams.has('note')) {
        const note_txt = urlParams.get('note');

        let note_box = document.createElement("textarea");
        note_box.id = "note-box";
        note_box.innerHTML = note_txt.replace(/(\\n)/g, '\r\n');;

        let noteX;
        let noteY;

        document.addEventListener("mouseup", () => {
            note_box.style.cursor = "grab";
        });
        note_box.addEventListener("mousedown", () => {
            note_box.style.cursor = "grabbing";

            noteX = event.clientX - note_box.offsetLeft;
            noteY = event.clientY - note_box.offsetTop;
        });

        document.addEventListener("mousemove", () => {
            if (note_box.style.cursor == "grabbing") {
                note_box.style.top = (event.clientY - noteY) + "px";
                note_box.style.left = (event.clientX - noteX) + "px";
            }
        });

        document.body.appendChild(note_box);
    }
}

function set_operation_type_list() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/database/api/get_operation_type_list.php", false);
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

function set_select_category() {
    // Get the selected account type by using let accounts
    select_category.innerHTML = "";

    operation_type_list.forEach(operation_type => {
        if (operation_type.account_type == selected_account.type) {
            select_category.innerHTML += `<option value="${operation_type.id}">${operation_type.title}</option>`;
        }
    });

    operation_type_list.forEach(operation_type => {
        if (operation_type.account_type == -1) {
            select_category.innerHTML += `<option value="${operation_type.id}">${operation_type.title}</option>`;
        }
    });
}

// Datasheet

function delete_element(element_id) {
    if (confirm("Are you sure you want to delete this operation ?")) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/controler/deleting_elements/operation.php?id=" + element_id, true);
        xhr.onload = () => {
            if (xhr.status == 200) {
                new_popup("Operation deleted", "success");
                update_datasheet();
            }
            else {
                new_popup("Error deleting operation", "error")
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
    let date = date_to_search.value;
    let temp_account = accounts;

    if (balance_view.value != 0) {
        temp_account = JSON.parse("[{\"id_account\":" + [balance_view.value] + "}]");
        show_balance(balance_view.value);
    }
    else {
        balance.value = "";
    }

    datasheet_clear();

    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/database/api/get_operations_by_accounts.php?accounts=" + JSON.stringify(temp_account) + "&limit=14&date=" + date, true);
    xhr.onload = () => {
        if (xhr.status == 200) {
            operations = JSON.parse(xhr.responseText);
            nb_operations = operations.length;

            if (nb_operations == 0) {
                new_popup("There is no operation at this date", "info");
                return;
            }

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
                datasheet.children[nb_operations - i - 1].children[3].innerHTML = operation_type_list[operations[i].category].title;

                if (operations[i].regularity == 0) {
                    datasheet.children[nb_operations - i - 1].children[4].innerHTML = '<img src="/assets/images/trash.png" alt="delete" class="card-button" onclick="delete_element(' + operations[i].id_operation + ')">';
                }
            }
        }
        else {
            new_popup("Error getting operations code #1", "error")
        }
    }
    xhr.send();
}

function fill_account_list() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/database/api/get_accounts_by_user.php?email=" + email, true);
    xhr.onload = () => {
        if (xhr.status == 200) {
            accounts = JSON.parse(xhr.responseText);
            if (accounts.length == 0) {
                new_popup("There is no account yet", "info");
                document.getElementById("add-field").disabled = true;
                return;
            }

            accounts.forEach(account => {
                account_list.innerHTML += `<option value="${account.id_account}">${account.label}</option>`;
                balance_view.innerHTML += `<option value="${account.id_account}">${account.label}</option>`;
            });

            update_datasheet();
        }
        else {
            new_popup("Error getting accounts code #2", "error")
        }
    };
    xhr.send();
}

function creating_operation_pannel() {
    set_select_category();

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
        new_popup("Please fill all the fields", "warn")
    }
    else {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/controler/creating_elements/operation.php?id_account=" + account_list.value +
            "&label=" + encodeURIComponent(label) +
            "&amount=" + amount +
            "&category=" + category +
            "&date=" + operation_date.value, true);
        xhr.onload = () => {
            if (xhr.status == 200) {
                update_datasheet();
                document.getElementById("label").value = "";
                document.getElementById("amount").value = "";
                selected_account.type == 0 ? document.getElementById("category").value = 1 : document.getElementById("category").value = 7;
                new_popup("Operation created", "success");
            }
            else {
                new_popup("Unknow error creating operations", "error");
            }
        };
        xhr.send();
    }
}

function show_balance(id_account) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `/database/api/get_amount_at_date.php?id_account=${id_account}&date=${date_to_search.value}]`, false);
    xhr.onload = () => {
        if (xhr.status == 200) {
            balance.value = JSON.parse(xhr.responseText) + " €";
        }
        else {
            new_popup("Error getting balance", "error");
        }
    };
    xhr.send();
}