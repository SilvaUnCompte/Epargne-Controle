<?php

# Don't change
require($_SERVER['DOCUMENT_ROOT']."/controler/template_engine.php");

# Can be change
$smarty->assign("title", "Epargne-controle - Budget");
$smarty->assign("page_name", "Budget");
$smarty->display("budget.tpl");