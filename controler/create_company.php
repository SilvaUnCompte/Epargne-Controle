<?php
require($_SERVER['DOCUMENT_ROOT'].'/database/tables/company.php');
require($_SERVER['DOCUMENT_ROOT'].'/controler/data.php');

if(!isset($_POST['input_name']) || !isset($_POST['input_desc']) || !isset($_POST['input_trust']) || !isset($_POST['input_street']) || !isset($_POST['input_city']) || !isset($_POST['input_postal']) || !isset($_POST['input_sector'])){
    echo "Missing data ";
    echo "<a href='/controler/pages/index.php'>Back</a>";
    exit();
}

$name = $_POST['input_name'];
$street = $_POST['input_street'];
$desc = $_POST['input_desc'];
$pilot_trust = $_POST['input_trust'];
$city = $_POST['input_city'];
$postal = $_POST['input_postal'];
$sector = $_POST['input_sector'];

$visible = isset($_POST['input_visible']) ? true : false;

//Création de l'utilisateur
Company::createCompany($name, $desc, $visible, $pilot_trust, [], ['street_address'=>$street, 'city'=>$city, 'postal_code'=>$postal], [], [$sector]);

header("Location: /controler/pages/personal_page.php");