<?php

require($_SERVER['DOCUMENT_ROOT']."/controler/template_engine.php");

$smarty->assign("title", "epargne-controle - Sitemap");
$smarty->display("sitemap.tpl");