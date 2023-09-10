<?php

require($_SERVER['DOCUMENT_ROOT']."/controler/template_engine.php");

$smarty->assign("title", "epargne-controle - Mention Legal");
$smarty->display("legal_mention.tpl");