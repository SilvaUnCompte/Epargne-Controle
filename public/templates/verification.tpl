{include file='helpers/header.tpl'}

<section id="analytics-board">
    <fieldset class="analytics-form">
        <div class="row-field">
            <select name="selected-checking-account" id="selected-checking-account">
                <option value="0"> Select a checking account </option>
            </select>
            <input type="month" name="selected-month" id="selected-month" disabled>
        </div>
    </fieldset>
</section>

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
    </section>

    <section id="add-pannel" class="container">
        <fieldset id="additional-operation" disabled>
            <legend>Additional operation</legend>
            <section id="additional-operation-section">
                <div class="row-field">
                    <section>
                        <input type="text" name="label-additional-operation" class="label-additional-operation"
                            placeholder="Label">
                        <input type="number" name="account-additional-operation" class="account-additional-operation"
                            placeholder="Amount" onchange="update_checking_account_chart()">
                    </section>
                    <img src="/assets/images/trash.png" class="button" alt="delete" class="card-button"
                        onclick="remove_new_operation(this)">
                </div>
                <div class="row-field">
                    <section>
                        <input type="text" name="label-additional-operation" class="label-additional-operation"
                            placeholder="Label">
                        <input type="number" name="account-additional-operation" class="account-additional-operation"
                            placeholder="Amount" onchange="update_checking_account_chart()">
                    </section>
                    <img src="/assets/images/trash.png" class="button" alt="delete" class="card-button"
                        onclick="remove_new_operation(this)">
                </div>
            </section>
            <div class="row-field bottom-info">
                <img src="/assets/images/plus.webp" class="button add-button" alt="add" class="card-button"
                    onclick="add_new_operation()">
            </div>
        </fieldset>
    </section>
</section>


<link rel="stylesheet" href="/public/styles/pages/analytics/analytics.css">
<link rel="stylesheet" href="/public/styles/pages/budget/budget.css">
<link rel="stylesheet" href="/public/styles/pages/operations/operations.css">
<link rel="stylesheet" href="/public/styles/pages/verification/verification.css">
<link rel="stylesheet" href="/public/styles/table/table.css">

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="/public/js/verification.js" type="text/javascript"></script>

{include file="helpers/footer.tpl"}