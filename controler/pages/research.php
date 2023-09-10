<?php

include($_SERVER['DOCUMENT_ROOT'] . '/controler/research_engine.php');
require($_SERVER['DOCUMENT_ROOT'] . "/controler/template_engine.php");

if (!isset($_GET['st']) || !isset($_GET['sc'])) {

    header("Location: /controler/pages/research.php?st=0&sc=");
}

$smarty->assign("title", "epargne-controle");
$smarty->display("research_head.tpl");

if ($_GET['st'] == (0)) {
    Search::researchOffer(htmlspecialchars($_GET['sc']));
} else {
    Search::researchCompany(htmlspecialchars($_GET['sc']));
}
?>

</div>
<div id="card_info_showing">
<div id="card_infos">
</div>

<?php
if(isset($_SESSION['type'])){
if ($_SESSION['type'] == 0 && $_GET['st'] == 0) {
    echo '<button id="postuler-button" class="btn_model_animated"> Postuler </button>';
} elseif ($_SESSION['type'] >= 1) {
    echo '<div id="buttons-div"><button id="modify-button" class="btn_model_animated"> Modifier </button>';
    echo '<button id="delete-button" class="btn_model_animated"> Supprimer </button></div>';
}}

$smarty->assign("title", "epargne-controle");
$smarty->display("research_foot.tpl");