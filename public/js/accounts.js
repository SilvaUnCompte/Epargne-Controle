const email = document.getElementById("email").value;
const datasheet = document.getElementById("datasheet");

onload = () => {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/database/api/get_accounts_by_user.php?email=" + email, true);
    xhr.onload = () => {
        if (xhr.status == 200) {
            let accounts = JSON.parse(xhr.responseText);

            accounts.forEach(account => {
                datasheet.innerHTML += `
                    <li id="card-${account.id_account}" onclick="transfer(${account.id_account})" class="table-row">
                        <div class="col col-1" data-label="Label"> --- </div>
                        <div class="col col-2" data-label="Sold"> --- </div>
                        <div class="col col-3" data-label="Type"> --- </div>
                  
                        <div class="col col-4 card-action-buttons">
                            <a href="/controler/pages/manage/account.php?id=${account.id_account}&label=${account.label}&type=${account.type}"><img src="/assets/images/exit.png"></a>
                            <a href="/controler/pages/analytics.php?id=${account.id_account}"><img src="/assets/images/exit.png"></a>
                            <a onclick="delete_account(${account.id_account})"> <img src="/assets/images/exit.png"/></a>
                        </div>
                    </tr>
                `;
            });
        }
        else {
            alert("Error getting accounts");
        }
    };
    xhr.send();
}

let transfer_data = [null, null];

function transfer(id) {
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

window.addEventListener('resize', () => {
    if (transfer_data[0] != null) {
        document.getElementById("card-" + transfer_data[0]).style = "";
    }
    if (transfer_data[1] != null) {
        document.getElementById("card-" + transfer_data[1]).style = "";
    }
    transfer_data = [null, null];
    document.getElementById("transfer-field").disabled = true;
});