<?php
require($_SERVER['DOCUMENT_ROOT'].'/database/tables/internship.php');
require($_SERVER['DOCUMENT_ROOT'].'/controler/data.php');

if(!isset($_POST['id_']) || !isset($_POST['input_title']) || !isset($_POST['input_desc']) || !isset($_POST['input_company_name']) || !isset($_POST['input_street']) || !isset($_POST['input_city']) || !isset($_POST['input_postal']) || !isset($_POST['input_lv']) || !isset($_POST['input_mail']) || !isset($_POST['input_remun']) || !isset($_POST['input_duration'])){
    echo "Missing data ";
    echo "<a href='/controler/pages/index.php'>Back</a>";
    exit();
}

$id = $_POST['id_'];
$editedInternship = new Internship($id);

$editedInternship->set_title($_POST['input_title']);
$editedInternship->set_desc($_POST['input_desc']);
$editedInternship->set_companyName( $_POST['input_company_name']);
$editedInternship->set_location($_POST['input_street'], $_POST['input_city'], $_POST['input_postal']);
$editedInternship->set_lvl($_POST['input_lv']);
$editedInternship->set_contactEmail($_POST['input_mail']);
$editedInternship->set_remuneration($_POST['input_remun']);
$editedInternship->set_duration($_POST['input_duration']);

$editedInternship->updateInternship();

header("Location: /controler/pages/research.php");