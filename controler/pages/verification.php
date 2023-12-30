<?php

# Don't change
require($_SERVER['DOCUMENT_ROOT']."/controler/template_engine.php");

# Can be change
$smarty->assign("title", "Epargne-controle - Verification");
$smarty->assign("page_name", "Verification");
$smarty->display("verification.tpl");