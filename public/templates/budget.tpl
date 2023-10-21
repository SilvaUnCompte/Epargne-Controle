{include file='helpers/header.tpl'}

<section id="analytics-board">
    <fieldset class="analytics-form">
        <div class="row-field">
            <select name="selected-checking-account" id="selected-checking-account">
                <option value="0"> Select a checking account </option>
            </select>
            <input type="month" name="selected-mounth" id="selected-mounth" disabled>
        </div>
    </fieldset>

    <section class="analytics-charts">
        <div id="checking-account-pannel">
            <fieldset id="checking-account-fieldset">
                <legend>Account info</legend>
                <div class="row-field">
                    <label for="account-incomes">Mounth incomes</label>
                    <span><input type="text" name="account-incomes" id="account-incomes" disabled>€</span>
                </div>
                <div class="row-field">
                    <label for="account-expenses">Mounth expenses</label>
                    <span><input type="text" name="account-expenses" id="account-expenses" disabled>€</span>
                </div>
                <div class="row-field">
                    <label for="account-remains">Mounth remains</label>
                    <span><input type="text" name="account-remains" id="account-remains" disabled>€</span>
                </div>
                <div class="row-field">
                    <label for="account-expected-savings">Expected savings</label>
                    <span>
                        <input type="number" name="account-expected-savings" id="account-expected-savings" disabled>€
                    </span>
                </div>
            </fieldset>
            <fieldset id="additional-expenditure-fieldset" disabled>
                <legend>Additional expenditure</legend>
                <div class="row-field">
                    <input type="checkbox" name="additional-expenditure-checkbox" id="additional-expenditure-checkbox">
                    <input type="text" name="additional-expenditure" id="additional-expenditure">
                    <span>
                        <input type="number" name="account-additional-expenditure" id="account-additional-expenditure">€
                    </span>
                    <img src="/assets/images/trash.png" alt="delete" class="card-button" onclick="delete_element()">
                </div>
                <div class="row-field">
                    <img src="/assets/images/trash.png" alt="delete" class="card-button" onclick="delete_element()">
                    Total expected expenditure : XXX€
                </div>
            </fieldset>
            <div id="checking-account-info">
            </div>
        </div>
        <div id="budget-account-div">
            <canvas id="budget-account-chart">Your browser does not support the canvas element.</canvas>
        </div>
    </section>

    <fieldset class="analytics-form">
        <select name="selected-savings-account" id="selected-savings-account">
            <option value="0"> Select a savings account </option>
        </select>
    </fieldset>

    <section class="analytics-charts">
        <div id="savings-account-div"><canvas id="savings-account-chart">Your browser does not support the canvas
                element.</canvas></div>
    </section>
</section>


<link rel="stylesheet" href="/public/styles/pages/analytics/analytics.css">
<link rel="stylesheet" href="/public/styles/pages/budget/budget.css">

<script src="https://cdn.jsdelivr.net/npm/chart.js@^4"></script>
<script src="https://cdn.jsdelivr.net/npm/moment@^2"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-moment@^1"></script>

<script src="/public/js/budget.js" type="text/javascript"></script>

{include file="helpers/footer.tpl"}