{include file='helpers/header.tpl'}

<section id="analytics-board">
    <fieldset id="analytics-form">
        <div class="row-field">
            <select name="selected-account" id="selected-account">
                <option value="0"> Select an account </option>
            </select>
            <input type="date" name="selected-mounth" id="selected-mounth" disabled>
        </div>
    </fieldset>

    <section id="analytics-charts">
        <div id="log-account-div"><canvas id="log-account-chart">Your browser does not support the canvas element.</canvas></div>
        <div id="budget-account-div"><canvas id="budget-account-chart">Your browser does not support the canvas element.</canvas></div>
    </section>
</section>


<link rel="stylesheet" href="/public/styles/pages/analytics/analytics.css">
<link rel="stylesheet" href="/public/styles/pages/budget/budget.css">

<script src="https://cdn.jsdelivr.net/npm/chart.js@^4"></script>
<script src="https://cdn.jsdelivr.net/npm/moment@^2"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-moment@^1"></script>

<script src="/public/js/budget.js" type="text/javascript"></script>

{include file="helpers/footer.tpl"}