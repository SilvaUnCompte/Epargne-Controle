<div class="form-row">
    <div class="form-col">
        <div class="research-account-div">
            <label>Pilote de mon centre : </label>
            <input id="search-pilote" type="text" placeholder="Rechercher un pilote...">
        </div>
        <div class="account-list">
            {for $i=0 to 4}
                <div class="account-example" id="pilote-{$i}">
                    <p class="account-title"><b>.</b></p>
                    <p class="account-title"><b></b></p>
                    <div>
                        <button class="btn-action" href='#'></button>
                        <button class="btn-action" href='#'></button>
                    </div>
                </div>
            {/for}
        </div>
    </div>
</div>