<?php
require($_SERVER['DOCUMENT_ROOT'].'/database/tables/company.php');
require($_SERVER['DOCUMENT_ROOT'].'/controler/data.php');

if(!isset($_POST['id_']) || !isset($_POST['input_name']) || !isset($_POST['input_desc']) || !isset($_POST['input_street']) || !isset($_POST['input_city']) || !isset($_POST['input_postal']) || !isset($_POST['input_trust'])){
    echo "Missing data ";
    echo "<a href='/controler/pages/index.php'>Back</a>";
    exit();
}

$id = $_POST['id_'];
$editedCompany = new Company($id);

$editedCompany->set_name($_POST['input_name']);
$editedCompany->set_desc($_POST['input_desc']);
$editedCompany->set_locations(['street_address'=>$_POST['input_street'], 'city'=>$_POST['input_city'], 'postal_code'=>$_POST['input_postal']]);
$editedCompany->set_pilotTrust($_POST['input_trust']);

$editedCompany->updateCompany();

header("Location: /controler/pages/research.php");