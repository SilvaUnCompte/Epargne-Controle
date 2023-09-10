<?php

require($_SERVER['DOCUMENT_ROOT'] . "/controler/template_engine.php");

if (session_status() !== PHP_SESSION_ACTIVE) session_start();

if (!isset($_SESSION["id"])) {
    header("Location: /controler/pages/login.php");
    exit();
}
else {
    $smarty->assign("title", "epargne-controle - Page Personnel");
    $smarty->display("personal_page/personal_page.tpl");
}