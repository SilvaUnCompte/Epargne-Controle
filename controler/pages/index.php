<?php

# Don't change
require($_SERVER['DOCUMENT_ROOT']."/controler/template_engine.php");

# Can be change
$smarty->assign("title", "Epargne-controle - Home");
$smarty->assign("page_name", "Overview");
$smarty->display("index.tpl");