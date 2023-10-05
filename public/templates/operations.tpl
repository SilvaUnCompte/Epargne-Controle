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
                        <div class="col col-5" data-label="Actions">
                            <a href="/operations/delete">Delete</a>
                    </li>
                {/for}
            </div>
        </ul>
        <input type="date" name="date-to-search" id="date-to-search" onchange="update_datasheet()">
    </section>

    <section id="add_pannel" class="container">
        <h1>Add an operation</h1>

        <div id="selected-account">
            <p>Selects the account on which to add an operation</p>
            <select name="selected-account" id="selected-account">

                {* TODO: Add the accounts here *}

            </select>
        </div>

        <form action="/accounts/transfer" method="POST">
            <fieldset id="add-field" disabled>
                <label for="date">Date</label>
                <input type="date" name="date" id="date" value="<?php echo date('Y-m-d'); ?>" required>
                <label for="amount">Amount</label>
                <input type="number" name="amount" placeholder="100€"
                    required="We need to know how much you want to transfer">
                <label for="amount">Label</label>
                <input type="text" name="label" id="label" placeholder="Label">
                <label for="amount">Category</label>
                <select name="category" id="category">
                    <option value="0">Groceries</option>
                    <option value="1">Leisure</option>
                    <option value="2">Rent & Utilities</option>
                    <option value="3">Health</option>
                    <option value="4">Clothing & Needed</option>
                    <option value="5">Other</option>
                    <input type="submit" value="Create">
            </fieldset>
        </form>
    </section>
</section>



<link rel="stylesheet" href="/public/styles/pages/operations/operations.css">
<link rel="stylesheet" href="/public/styles/table/table.css">
<link rel="stylesheet" href="/public/styles/generics/generics.css">

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="/public/js/operations.js" type="text/javascript"></script>

{include file="helpers/footer.tpl"}