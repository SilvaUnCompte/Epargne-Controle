<?php

require($_SERVER['DOCUMENT_ROOT'] . "/controler/template_engine.php");
require($_SERVER['DOCUMENT_ROOT'] . '/database/tables/company.php');
require($_SERVER['DOCUMENT_ROOT'] . '/controler/data.php');

if (session_status() !== PHP_SESSION_ACTIVE) session_start();

if (!isset($_SESSION["id"])) {
    header("Location: /controler/pages/login.php");
    exit();
} else if ($_SESSION['type'] >= 1 || !isset($_GET['id'])) {

    $smarty->assign("title", "epargne-controle - Edition d'une entreprise");
    $currentCompany = new Company(intval($_GET['id']));

    $smarty->assign("id_", $_GET['id']);
    $smarty->assign("name", $currentCompany->get_name());
    $smarty->assign("desc", $currentCompany->get_desc());
    $smarty->assign("location", [$currentCompany->get_locations()]);
    $smarty->assign("trust", $currentCompany->get_pilotTrust());
    $smarty->assign("visible", $currentCompany->get_visible());

    $smarty->display("edit_company.tpl");
} else {
    header("HTTP/1.1 403 Unauthorized");
    exit;
}
