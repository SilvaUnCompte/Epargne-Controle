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

    <section class="analytics-charts" id="checking-analytics-charts">
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
                    <div>
                        <input type="number" name="account-expected-savings" id="account-expected-savings" disabled>€
                    </div>
                </div>
            </fieldset>
            <fieldset id="additional-expenditure-fieldset" disabled>
                <legend>Additional expenditure</legend>
                <section id="additional-expenditure-section">
                    <div class="row-field">
                        <div>
                            <input type="text" name="label-additional-expenditure" class="label-additional-expenditure"
                                placeholder="Label">
                            <input type="number" name="account-additional-expenditure"
                                class="account-additional-expenditure" placeholder="Amount"
                                onchange="update_checking_account_chart()">€
                        </div>
                        <img src="/assets/images/trash.png" class="button" alt="delete" class="card-button"
                            onclick="remove_expenditure(this)">
                    </div>
                </section>
                <div class="row-field bottom-info">
                    <img src="/assets/images/plus.webp" class="button add-button" alt="add" class="card-button"
                        onclick="add_expenditure()">
                    <p>Total expected expenditure : <span id="total-add-expenditure">0</span> €</p>
                </div>
            </fieldset>
            <div id="checking-account-info">
            </div>
        </div>
        <div id="budget-account-div">
            <canvas id="budget-account-chart" style="height: 460px; width: 460px;">Your browser does not support the
                canvas element.</canvas>
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