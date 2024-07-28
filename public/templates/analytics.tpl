{include file='helpers/header.tpl'}

<section id="analytics-board">
    <fieldset class="analytics-form" id="analytics-form">
        <div class="row-field">
            <select name="selected-account" id="selected-account">
                <option value="0"> Select an account </option>
            </select>
            <input type="date" name="start" id="analytics-start" disabled>
            <input type="date" name="end" id="analytics-end" disabled>
        </div>
    </fieldset>

    <section class="analytics-charts">
        <div id="log-account-div"><canvas id="log-account-chart">Your browser does not support the canvas
                element.</canvas></div>
        <div id="categories-account-div"><canvas id="categories-account-chart">Your browser does not support the canvas
                element.</canvas></div>
    </section>

    <div class="forecast-checkbox">
        <input type="checkbox" id="forecast-toggle" name="forecast-toggle">
        <label for="forecast-toggle" class="noselect">Enable Forecast</label>
        <span id="forecast-info"></span>
    </div>
    <div class="forecast-checkbox">
        <input type="checkbox" id="forecast-ajust" name="forecast-ajust">
        <label for="forecast-ajust" class="noselect">Ajust to date</label>
    </div>
    <input type="date" name="index" id="analytics-index">

</section>

<br>
<br>

<link rel="stylesheet" href="/public/styles/pages/analytics/analytics.css">

<script src="https://cdn.jsdelivr.net/npm/chart.js@^4"></script>
<script src="https://cdn.jsdelivr.net/npm/moment@^2"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-moment@^1"></script>

<script src="/public/js/analytics.js" type="text/javascript"></script>

{include file="helpers/footer.tpl"}