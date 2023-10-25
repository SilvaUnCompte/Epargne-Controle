<?php

# Don't change
require($_SERVER['DOCUMENT_ROOT']."/controler/template_engine.php");

# Can be change
$smarty->assign("title", "Epargne-controle - Accounts");
$smarty->assign("page_name", "Accounts");
$smarty->assign("head_color", "blue");
$smarty->display("accounts.tpl");