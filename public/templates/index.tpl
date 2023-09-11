{include file='helpers/header.tpl'}


<div id="dashboard">

    <section>
        {* col gauche avec liste mouvement bancaire récent X dernier à partir de date ajd *}
    </section>

    <section>
        <section>
            <section>
                {* mini zone compte courant *}
            </section>
            <section>
                {* mini zone compte épargne *}
            </section>
        </section>

        <section>
            {* camembert budget du mois *}
        </section>
    </section>

</div>

<div style="width: 800px;"><canvas id="acquisitions"></canvas></div>


<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="/public/js/home.js" type="text/javascript"></script>

{include file="helpers/footer.tpl"}