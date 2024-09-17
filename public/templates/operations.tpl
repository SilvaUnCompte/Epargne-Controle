{include file='helpers/header.tpl'}

<section class="dashboard">
    <section class="container">
        <ul class="responsive-table">
            <li class="table-header">
                <div class="col col-1">Date</div>
                <div class="col col-2">Label</div>
                <div class="col col-3">Amount</div>
                <div class="col col-4">Category</div>
                <div class="col col-5">Actions</div>
            </li>
            <div id="datasheet">
                {for $i = 0; $i < 14; $i++}
                    <li class="table-row">
                        <div class="col col-1" data-label="Date"> --- </div>
                        <div class="col col-2" data-label="Label"> --- </div>
                        <div class="col col-3" data-label="Amount"> --- </div>
                        <div class="col col-4" data-label="Category"> --- </div>
                        <div class="col col-5" data-label="Actions"></div>
                    </li>
                {/for}
            </div>
        </ul>
        <input type="date" name="date-to-search" id="date-to-search" onchange="update_datasheet()">
        <select name="balance-view" id="balance-view" onchange="update_datasheet()">
            <option value="0"> Select an account </option>
        </select>
        <input type="text" name="balance" id="balance" placeholder="Balance" disabled>
    </section>

    <section id="add-pannel" class="container">
        <h1>Add an operation</h1>

        <form id="add-form">

            <div id="account_selection">
                <p>Selects the account on which to add an operation</p>
                <select name="selected-account" id="selected-account">
                    <option value="0"> Select an account </option>
                </select>
            </div>

            <fieldset id="add-field">
                <div>
                    <label for="amount">Amount</label>
                    <input type="number" name="amount" id="amount" placeholder="100€"
                        required="We need to know how much you want to transfer" step="0.01">
                </div>
                <div class="flex-div">
                    <div>
                        <label for="operation_date">Date</label>
                        <input type="date" name="date" id="operation_date" required>
                    </div>

                    <div>
                        <label for="category">Category</label>
                        <select name="category" id="category">
                        </select>
                    </div>
                </div>
                <div>
                    <label for="label">Label</label>
                    <input type="text" name="label" id="label" placeholder="Label" required>
                </div>

                <a id="create-operation" class="valide_button noselect" onclick="create_operation()">Create</a>

            </fieldset>
        </form>
    </section>
</section>

<br>
<br>

<link rel="stylesheet" href="/public/styles/pages/operations/operations.css">
<link rel="stylesheet" href="/public/styles/table/table.css">

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="/public/js/operations.js" type="text/javascript"></script>

{include file="helpers/footer.tpl"}