{include file='helpers/header.tpl'}


<section id="event-board">

    <fieldset id="event-form">
        <div class="row-field">
            <div class="column-field">
                <label for="selected-account">Account</label>
                <select name="selected-account" id="selected-account" onchange="set_select_category()">
                    <option value="0"> Select an account </option>
                </select>
            </div>

            <div class="column-field">
                <label for="label">Label</label>
                <input type="text" name="label" id="label" placeholder="Label" required>
            </div>

            <div class="column-field">
                <label for="amount">Amount</label>
                <input type="number" name="amount" id="amount" placeholder="100€"
                    required="We need to know how much you want to transfer" step="0.01">
            </div>

            <div class="column-field">
                <label for="event_start">Start</label>
                <input type="date" name="start" id="event_start" required>
            </div>

            <div class="column-field">
                <label for="event_end">End</label>
                <input type="date" name="end" id="event_end" required>
            </div>

            <div class="column-field">
                <label for="frequency">Frequency</label>
                <select name="frequency" id="frequency">
                    <option value="3">Every year</option>
                    <option value="2">Every month</option>
                    <option value="1">Every week</option>
                    <option value="0">Every day</option>
                </select>
            </div>

            <div class="column-field">
                <label for="category">Category</label>
                <select name="category" id="category">
                    <option value="0"> Other </option>
                </select>
            </div>
        </div>
        <a id="create-event" class="valide_button noselect" onclick="create_event()">Create</a>
    </fieldset>

    <section id="event-list">
        <ul class="responsive-table">

            <li class="table-header">
                <div class="col col-1">Label</div>
                <div class="col col-2">Amount</div>
                <div class="col col-3">Account</div>
                <div class="col col-4">Start</div>
                <div class="col col-5">End</div>
                <div class="col col-6">Frequency</div>
                <div class="col col-7">Category</div>
                <div class="col col-8">Actions</div>
            </li>
            <div id="datasheet"> </div>
        </ul>
    </section>

    <input type="date" name="date-to-search" id="date-to-search" onchange="update_datasheet()">

</section>

<br>
<br>

<link rel="stylesheet" href="/public/styles/pages/events/events.css">
<link rel="stylesheet" href="/public/styles/table/table.css">

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="/public/js/events.js" type="text/javascript"></script>

{include file="helpers/footer.tpl"}