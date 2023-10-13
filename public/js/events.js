const email = '<%=Session["email"]%>'
const datasheet = document.getElementById("datasheet");
const date_to_search = document.getElementById("date-to-search");
const account_list = document.getElementById("selected-account");
let accounts = [];

onload = () => {
    fill_account_list();
    date_to_search.valueAsDate = new Date();
}

function delete_element(event_id) {
    if (confirm("Are you sure you want to delete this operation ?")) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/controler/deleting_elements/event.php?id=" + event_id, true);
        xhr.onload = () => {
            if (xhr.status == 200) {
                update_datasheet();
                new_popup("Event deleted", "success");
            }
            else {
                new_popup("Error deleting operation", "error");
            }
        }
        xhr.send();
    }
}

function update_datasheet() {
    date = date_to_search.value;
    datasheet.innerHTML = "";

    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/database/api/get_events_by_accounts.php?accounts=" + accounts + "&date=" + date, true);
    xhr.onload = () => {
        if (xhr.status == 200) {
            events = JSON.parse(xhr.responseText);
            nb_events = events.length;

            if (nb_events == 0) {
                new_popup("There is no event at this date", "info");
                return;
            }

            if (nb_events == 0) {
                datasheet.innerHTML += `<li class="table-row">
                    <div class="col col-1" data-label="Label"> No regular event in this time </div>
                    <div class="col col-2" data-label="Amount"> --- </div>
                    <div class="col col-3" data-label="Start"> --- </div>
                    <div class="col col-4" data-label="End"> --- </div>
                    <div class="col col-5" data-label="Frequency"> --- </div>
                    <div class="col col-6" data-label="Category"> --- </div>
                    <div class="col col-7" data-label="Actions"> --- </div>
                </li>`;
            }
            else {
                for (let i = 0; i < nb_events; i++) {
                    datasheet.innerHTML += `<li class="table-row">
                        <div class="col col-1" data-label="Label"> ${events[i].label} </div>
                        <div class="col col-2" data-label="Amount"> ${events[i].amount.toFixed(2)} € </div>
                        <div class="col col-3" data-label="Start"> ${events[i].start} </div>
                        <div class="col col-4" data-label="End"> ${events[i].end} </div>
                        <div class="col col-5" data-label="Frequency"> ${events[i].frequency_type == 0 ? "Every Day" : events[i].frequency_type == 1 ? "Every Week" : events[i].frequency_type == 2 ? "Every Month" : "Every Year"} </div>
                        <div class="col col-6" data-label="Category"> ${events[i].category == 0 ? "Groceries" : events[i].category == 1 ? "Leisure" : events[i].category == 2 ? "Rent & utilities" : events[i].category == 3 ? "Health" : events[i].category == 4 ? "Shopping" : "Other"} </div>
                        <div class="col col-7" data-label="Actions"> --- </div>
                    </li>`;

                    if (events[i].amount > 0) {
                        datasheet.children[i].children[1].style.color = "green";
                    }
                    else {
                        datasheet.children[i].children[1].style.color = "red";
                    }

                    datasheet.children[i].children[6].innerHTML = '<img src="/assets/images/trash.png" alt="delete" class="card-button" onclick="delete_element(' + events[i].id_regular_event + ')">';
                }
            }
        }
        else {
            new_popup("Error getting events code #1", "error");
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
            accounts_list = JSON.parse(xhr.responseText);

            if (accounts_list.length == 0) {
                new_popup("There is no account yet", "info");
                document.getElementById("event-form").disabled = true;
                return;
            }

            accounts_list.forEach(account => {
                account_list.innerHTML += `<option value="${account.id_account}">${account.label}</option>`;
            });

            update_datasheet();
        }
        else {
            new_popup("Error getting accounts", "error");
        }
    };
    xhr.send();
}

function create_event() {
    label = document.getElementById("label").value;
    amount = document.getElementById("amount").value;
    category = document.getElementById("category").value;
    start = document.getElementById("event_start").value;
    end = document.getElementById("event_end").value;
    frequency = document.getElementById("frequency").value;
    account = account_list.value;
    if (label.length > 50) {
        label = label.substring(0, 47) + "...";
    }

    if (label == "" || amount == "" || category == "" || start == "" || end == "" || frequency == "" || account == 0) {
        new_popup("Please fill all the fields", "warn");
    }
    else {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/controler/creating_elements/event.php?id_account=" + account_list.value +
            "&label=" + label +
            "&amount=" + amount +
            "&category=" + category +
            "&start=" + start +
            "&end=" + end +
            "&frequency=" + frequency, true);
        xhr.onload = () => {
            if (xhr.status == 200) {
                update_datasheet();
                document.getElementById("label").value = "";
                document.getElementById("amount").value = "";
                document.getElementById("event_start").value = "";
                document.getElementById("event_end").value = "";
                document.getElementById("category").value = 0;
                new_popup("Event created", "success");
            }
            else {
                new_popup("Unknow error creating event", "error");
            }
        };
        xhr.send();
    }
}