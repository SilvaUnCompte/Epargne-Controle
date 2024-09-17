{include file='helpers/header.tpl'}


<section class="dashboard">
    <section class="container">
        <ul class="responsive-table">
            <li class="table-header">
                <div class="col col-1">Label</div>
                <div class="col col-2">Sold</div>
                <div class="col col-3">Type</div>
                <div class="col col-4">Actions</div>
            </li>
            <div id="datasheet">
            </div>
        </ul>

        <section id="create-account-field">
            <h1>Create account</h1>
            <input type="text" name="label" id="create-account-label" placeholder="Label" required>
            <input type="number" name="sold" id="create-account-sold" placeholder="100€" required>
            <select name="type" id="create-account-type" required>
                <option value="0">Checking</option>
                <option value="1">Saving</option>
            </select>
            <div id="cancel-account">
                <a id="create-account-2" class="valide_button noselect" onclick="create_account()">Create account</a>
                <a class="valide_button noselect" onclick='cancel_create_account()'>Cancel</a>
            </div>
        </section>

        <a id="create-account" class="valide_button noselect" onclick="create_account()">Create account</a>

        <b id="total-sold">Total: 0.00 €</b>
    </section>


    <section id="transfer" class="container">
        <h1>Transfer</h1>

        <div id="selected-account-0" class="back-table-row">
            <p>Select an account to transfer from</p>
        </div>

        <img src="/assets/images/arrow.png" alt="arrow" class="arrow" width="70px">

        <div id="selected-account-1" class="back-table-row">
            <p>Select an account to transfer to</p>
        </div>

        <fieldset id="transfer-field" disabled>
            <input type="text" name="label" id="label" placeholder="Label">
            <div>
                <input type="number" name="amount" id="amount" placeholder="100€"
                    required="We need to know how much you want to transfer">
                <input type="date" name="date" id="date" required>
            </div>
            <a id="create-transfer" class="valide_button noselect" onclick="process_transfer()">Transfer</a>
        </fieldset>
    </section>
</section>

<br>
<br>

<link rel="stylesheet" href="/public/styles/table/table.css">
<link rel="stylesheet" href="/public/styles/pages/accounts/accounts.css">
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="/public/js/accounts.js" type="text/javascript"></script>

{include file="helpers/footer.tpl"}