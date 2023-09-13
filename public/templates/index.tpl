{include file='helpers/header.tpl'}


<div id="dashboard">

    <section id="left-pannel">
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Label</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                {for $i = 0; $i < 15; $i++}
                    <tr>
                        <td>{$i}</td>
                        <td>{$i*20}</td>
                        <td>{$i**5}</td>
                    </tr>
                {/for}
            </tbody>
        </table>

        {* col gauche avec liste mouvement bancaire récent X dernier à partir de date ajd *}
    </section>

    <section id="right-pannel">
        <section class="flex-inline">
            <section>
                {* mini zone compte courant *}
                <div style="width: 400px;"><canvas id="overview_checking_account"></canvas></div>
            </section>
            <section>
                {* mini zone compte épargne *}
                <div style="width: 400px;"><canvas id="overview_savings_account"></canvas></div>
            </section>
        </section>

        <section>
            {* camembert budget du mois *}
            <div style="width: 400px;"><canvas id="overview_monthly_budget"></canvas></div>
        </section>
    </section>

</div>



<link rel="stylesheet" href="/public/styles/home/home.css">
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="/public/js/home.js" type="text/javascript"></script>

{include file="helpers/footer.tpl"}