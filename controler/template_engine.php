<?php

require($_SERVER['DOCUMENT_ROOT'] . "/assets/vendors/smarty/libs/Smarty.class.php");
$smarty = new Smarty();
$smarty->setTemplateDir($_SERVER['DOCUMENT_ROOT'] . '/public/templates/');

$request_uri = "$_SERVER[REQUEST_URI]";

// Check if user is connected
if (session_status() !== PHP_SESSION_ACTIVE) session_start();
if (!isset($_SESSION['id'])) {
    $smarty->assign("title", "Epargne-controle - Login");
    $smarty->assign("request_url", $request_uri);
    $smarty->display("login.tpl");
    exit();
}
