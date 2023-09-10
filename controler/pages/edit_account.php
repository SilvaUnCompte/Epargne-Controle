<?php

require($_SERVER['DOCUMENT_ROOT'] . "/controler/template_engine.php");
require($_SERVER['DOCUMENT_ROOT'] . '/database/tables/user.php');
require($_SERVER['DOCUMENT_ROOT'] . '/controler/data.php');


if (session_status() !== PHP_SESSION_ACTIVE) session_start();

if (!isset($_SESSION["id"])) {
    header("Location: /controler/pages/login.php");
    exit();
} else if ($_SESSION['type'] >= 1 || !isset($_GET['id'])) {

    $smarty->assign("title", "epargne-controle - Edition d'un compte");
    $currentUser = new User(intval($_GET['id']));

    if(!isset($currentUser)) {
        header("HTTP/1.1 404");
    }

    $smarty->assign("id_", $_GET['id']);
    $smarty->assign("firstname", $currentUser->get_firstname());
    $smarty->assign("lastname", $currentUser->get_lastname());
    $smarty->assign("email", $currentUser->get_email());
    $smarty->assign("campus", $currentUser->get_campus());
    $smarty->assign("promo", $currentUser->get_promo());
    $smarty->assign("type", $currentUser->get_type());

    $smarty->display("edit_account.tpl");
} else {
    header("HTTP/1.1 403 Unauthorized");
    exit;
}
