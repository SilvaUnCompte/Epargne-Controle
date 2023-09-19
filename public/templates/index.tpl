{include file='helpers/header.tpl'}

<section class="dashboard">
    <section class="container">
        <ul class="responsive-table">
            <li class="table-header">
                <div class="col col-1">Date</div>
                <div class="col col-2">Label</div>
                <div class="col col-3">Amount</div>
                <div class="col col-4">Category</div>
            </li>
            <div id="datasheet">
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

    {* col gauche avec liste mouvement bancaire récent X dernier à partir de date ajd *}

    <section class="container">
        <section class="flex-inline">
            <section>
                {* mini zone compte courant *}
                <div style="width: 400px;"><canvas id="overview-checking-account"></canvas></div>
            </section>
            <section>
                {* mini zone compte épargne *}
                <div style="width: 400px;"><canvas id="overview-savings-account"></canvas></div>
            </section>
        </section>

        <section>
            {* camembert budget du mois *}
            <div style="width: 400px;"><canvas id="overview-monthly-budget"></canvas></div>
        </section>
    </section>
</section>



<link rel="stylesheet" href="/public/styles/pages/home/home.css">
<link rel="stylesheet" href="/public/styles/table/table.css">
<link rel="stylesheet" href="/public/styles/generics/generics.css">

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="/public/js/home.js" type="text/javascript"></script>

{include file="helpers/footer.tpl"}