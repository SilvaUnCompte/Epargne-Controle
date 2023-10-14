<?php

require($_SERVER['DOCUMENT_ROOT'] . "/assets/vendors/smarty/libs/Smarty.class.php");
$smarty = new Smarty();
$smarty->setTemplateDir($_SERVER['DOCUMENT_ROOT'] . '/public/templates/');


// Check if user is connected
if (session_status() !== PHP_SESSION_ACTIVE) session_start();
if (!isset($_SESSION['email'])) {
    $_SESSION['username'] = "";
    $smarty->assign("title", "Epargne-controle - Login");
    $smarty->assign("error", 0);
    $smarty->assign("page_name", "Overview");
    $smarty->display("login.tpl");
    exit();
}
