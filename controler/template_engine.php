<?php

# Ne pas toucher stp :)
require($_SERVER['DOCUMENT_ROOT']."/assets/vendors/smarty/libs/Smarty.class.php");
$smarty = new Smarty();
$smarty->setTemplateDir($_SERVER['DOCUMENT_ROOT'].'/public/templates/');