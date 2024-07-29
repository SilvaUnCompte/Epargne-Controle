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

    <section class="analytics-charts" id="checking-analytics-charts">
        <div id="checking-account-pannel">
            <fieldset id="checking-account-fieldset">
                <legend>Account info</legend>
                <div class="row-field">
                    <label for="account-incomes">month incomes</label>
                    <span><input type="text" name="account-incomes" id="account-incomes" disabled>€</span>
                </div>
                <div class="row-field">
                    <label for="account-expenses">month expenses</label>
                    <span><input type="text" name="account-expenses" id="account-expenses" disabled>€</span>
                </div>
                <div class="row-field">
                    <label for="account-remains">month remains</label>
                    <span><input type="text" name="account-remains" id="account-remains" disabled>€</span>
                </div>
                <div class="row-field">
                    <label for="account-expected-savings">Expected savings</label>
                    <section><input type="number" name="account-expected-savings" id="account-expected-savings"
                            disabled>€</section>
                </div>
            </fieldset>
            <fieldset id="additional-expenditure-fieldset" disabled>
                <legend>Additional expenditure</legend>
                <section id="additional-expenditure-section">
                    <div class="row-field">
                        <section>
                            <input type="text" name="label-additional-expenditure" class="label-additional-expenditure"
                                placeholder="Label">
                            <input type="number" name="account-additional-expenditure"
                                class="account-additional-expenditure" placeholder="Amount"
                                onchange="update_charts()"><span> €</span>
                        </section>
                        <img src="/assets/images/trash.png" class="button" alt="delete" class="card-button"
                            onclick="remove_expenditure(this)">
                    </div>
                </section>
                <div class="row-field bottom-info">
                    <img src="/assets/images/plus.webp" class="button add-button" alt="add" class="card-button"
                        onclick="add_expenditure()">
                    <span>Total expected expenditure : <span id="total-add-expenditure">0</span> €</span>
                </div>
            </fieldset>
            <div id="checking-account-info">
            </div>
        </div>
        <div class="budget-account-div">
            <canvas id="pie-chart-canvas" style="height: 460px; width: 460px;">Your browser does not support the
                canvas element.</canvas>
        </div>
    </section>

    {* <fieldset class="analytics-form">
        <div class="row-field">
            <select name="selected-savings-account" id="selected-savings-account">
                <option value="0"> Select a savings account </option>
            </select>
            <input type="number" min="1" max="60" name="selected-duration" id="selected-duration" value="3"> years
        </div>
    </fieldset>
    <section class="analytics-charts">
        <div id="savings-account-div">
            <canvas id="savings-account-chart" style="height: 500px; width: 100%;">Your browser does not support the
                canvas element.</canvas>
        </div>
    </section> *}

    <section class="dashboard">
        <section class="container">
            <ul class="responsive-table">
                <li class="table-header">
                    <div class="col col-1">Date</div>
                    <div class="col col-2">Label</div>
                    <div class="col col-3">Amount</div>
                    <div class="col col-4">Category</div>
                </li>
                <div id="datasheet" class="budget-account-div">
                    {for $i = 0; $i < 14; $i++}
                        <li class="table-row">
                            <div class="col col-1" data-label="Date"> --- </div>
                            <div class="col col-2" data-label="Label"> --- </div>
                            <div class="col col-3" data-label="Amount"> --- </div>
                            <div class="col col-4" data-label="Category"> --- </div>
                        </li>
                    {/for}
                </div>
            </ul>
        </section>
        <section class="container">
            <div class="budget-account-div">
                <canvas id="bar-chart-canvas" style="height: 500px; width: 100%;">Your browser does not support the
                    canvas element.</canvas>
            </div>
            <div>
                <input type="checkbox" id="logarithmic-axis" name="logarithmic-axis">
                <label for="logarithmic-axis">Logarithmic axis</label>
            </div>
        </section>
    </section>

</section>

<br>
<br>

<link rel="stylesheet" href="/public/styles/pages/analytics/analytics.css">
<link rel="stylesheet" href="/public/styles/pages/budget/budget.css">
<link rel="stylesheet" href="/public/styles/table/table.css">
<link rel="stylesheet" href="/public/styles/pages/home/home.css">

<script src="https://cdn.jsdelivr.net/npm/chart.js@^4"></script>
<script src="https://cdn.jsdelivr.net/npm/moment@^2"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-moment@^1"></script>

<script src="/public/js/budget.js" type="text/javascript"></script>

{include file="helpers/footer.tpl"}