{include file='helpers/header.tpl'}

<section id="analytics-board">
    <fieldset id="analytics-form">
        <div class="row-field">
            <select name="selected-account" id="selected-account">
                <option value="0"> Select an account </option>
            </select>
            <input type="date" name="start" id="analytics-start" disabled>
            <input type="date" name="end" id="analytics-end" disabled>
        </div>
    </fieldset>

    <section id="analytics-charts">
        <div id="log-account-div"><canvas id="log-account-chart"></canvas></div>
        <div id="budget-account-div"><canvas id="budget-account-chart"></canvas></div>
    </section>
</section>

<link rel="stylesheet" href="/public/styles/pages/analytics/analytics.css">

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="/public/js/analytics.js" type="text/javascript"></script>

{include file="helpers/footer.tpl"}