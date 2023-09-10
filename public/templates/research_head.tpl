{include file='helpers/header.tpl'}

<link href="/public/styles/generics/commons/commons.css" rel="stylesheet">
<link href="/public/styles/research/research_style.css" rel="stylesheet">
<link href="/public/styles/cards/style.css" rel="stylesheet">

<main>
    <div id="first_row" class="row">
        <form id="filters_column" method="get">
            <div class="filter">
                <div class="filter-title first">
                    <h1>Type de recherche</h1>
                    <a id="close-filters-button">✖</a>
                </div>
                <div id="radio-type" class="filters">
                    <div>
                        <input type="radio" name="st" value="0" {if $smarty.get.st == (0)} checked {/if}>
                        <label>Offre de stage</label>
                    </div>
                    <div>
                        <input type="radio" name="st" value="1" {if $smarty.get.st == (1)} checked {/if}>
                        <label>Entreprise</label>
                    </div>
                    </a>
                </div>
            </div>
            {* <?php
                    if(isset($_POST['st'])){
                        if($_POST['st'] == 'offer'){
                            Data::get_researchOffersFilters(1);
                            Data::get_researchOffersFilters(2);
                            Data::durationFilter();
                        }elseif($_POST['st'] == 'company'){
                            Data::get_researchCompanyFilters(1);
                            Data::get_researchCompanyFilters(2);
                        }
                    }
                ?> *}
            <div class="button-research-type">
                <button type="button" class="btn_model_animated" onclick="search()">Confirmer</button>
                <button type="reset" class="btn_model_animated">Réinitialiser</button>
            </div>
        </form>
        <div id="search_and_results_column">
            <div>
                <div id="search_row">
                    <form id="search_bar" action="/controler/pages/research.php" method="get">
                        <button id="show_filters_button" class="btn_model_animated" type="button">Filtres</button>
                        <input id="search-bar" type="search" placeholder="Search" name="sc" value={$smarty.get.sc}>
                        <button type="button" class="btn_model_animated" onclick="search()">Search</button>
                    </form>
                </div>
                <div id="results_row" class="row">
            <div id="card_list">