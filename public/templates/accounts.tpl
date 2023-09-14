{include file='helpers/header.tpl'}


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




<link rel="stylesheet" href="/public/styles/home/home.css">
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="/public/js/home.js" type="text/javascript"></script>

{include file="helpers/footer.tpl"}