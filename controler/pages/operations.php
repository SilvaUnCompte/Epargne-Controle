<?php

# Don't change
require($_SERVER['DOCUMENT_ROOT']."/controler/template_engine.php");

# Can be change
$smarty->assign("title", "Epargne-controle - Operations");
$smarty->assign("page_name", "Operations");
$smarty->display("operations.tpl");