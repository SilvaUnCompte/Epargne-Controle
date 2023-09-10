<?php

require($_SERVER['DOCUMENT_ROOT']."/controler/template_engine.php");

$smarty->assign("title", "epargne-controle - Login");
$smarty->assign("state", 0);
$smarty->display("login.tpl");