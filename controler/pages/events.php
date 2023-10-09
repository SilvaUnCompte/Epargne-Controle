<?php

# Don't change
require($_SERVER['DOCUMENT_ROOT']."/controler/template_engine.php");

# Can be change
$smarty->assign("title", "Epargne-controle - Regular Events");
$smarty->assign("page_name", "Regular Events");
$smarty->display("events.tpl");