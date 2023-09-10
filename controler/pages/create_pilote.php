<?php

require($_SERVER['DOCUMENT_ROOT'] . "/controler/template_engine.php");

if (session_status() !== PHP_SESSION_ACTIVE) session_start();

if (!isset($_SESSION["id"])) {
    header("Location: /controler/pages/login.php");
    exit();
} else if ($_SESSION['type'] >= 2) {
    $smarty->assign("title", "epargne-controle - Ajout d'un pilote");
    $smarty->assign("account_type", 1);
    $smarty->display("create_account.tpl");
} else {
    header("HTTP/1.1 403 Unauthorized");
    exit;
}