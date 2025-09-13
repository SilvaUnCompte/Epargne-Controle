<?php

# Don't change
require($_SERVER['DOCUMENT_ROOT']."/controler/template_engine.php");

# Can be change
$smarty->assign("title", "Analytics");
$smarty->assign("page_name", "Analytics");
$smarty->display("analytics.tpl");