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
        <div id="log-account-div"><canvas id="log-account-chart">Your browser does not support the canvas element.</canvas></div>
        <div id="categories-account-div"><canvas id="categories-account-chart">Your browser does not support the canvas element.</canvas></div>
    </section>
</section>


<link rel="stylesheet" href="/public/styles/pages/analytics/analytics.css">

<script src="https://cdn.jsdelivr.net/npm/chart.js@^4"></script>
<script src="https://cdn.jsdelivr.net/npm/moment@^2"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-moment@^1"></script>

<script src="/public/js/analytics.js" type="text/javascript"></script>

{include file="helpers/footer.tpl"}