<?php

require($_SERVER['DOCUMENT_ROOT'] . "/controler/template_engine.php");
require($_SERVER['DOCUMENT_ROOT'] . '/database/tables/internship.php');
require($_SERVER['DOCUMENT_ROOT'] . '/controler/data.php');

if (session_status() !== PHP_SESSION_ACTIVE) session_start();

if (!isset($_SESSION["id"])) {
    header("Location: /controler/pages/login.php");
    exit();
} else if ($_SESSION['type'] >= 1 || !isset($_GET['id'])) {

    $smarty->assign("title", "epargne-controle - Edition d'un stage");
    $currentInternship = new Internship(intval($_GET['id']));

    $smarty->assign("id_", $_GET['id']);
    $smarty->assign("title_", $currentInternship->get_title());
    $smarty->assign("lvl", $currentInternship->get_lvl());
    $smarty->assign("desc", $currentInternship->get_desc());
    $smarty->assign("contactEmail", $currentInternship->get_contactEmail());
    $smarty->assign("remuneration", $currentInternship->get_remuneration());
    $smarty->assign("duration", $currentInternship->get_duration());
    $smarty->assign("location", $currentInternship->get_location());
    $smarty->assign("companyName", $currentInternship->get_companyName());

    $smarty->display("edit_internship.tpl");
} else {
    header("HTTP/1.1 403 Unauthorized");
    exit;
}
