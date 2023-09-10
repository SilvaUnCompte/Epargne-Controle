<?php
require($_SERVER['DOCUMENT_ROOT'].'/database/tables/internship.php');
require($_SERVER['DOCUMENT_ROOT'].'/controler/data.php');

if(!isset($_POST['input_title']) || !isset($_POST['input_desc']) || !isset($_POST['input_company_name']) || !isset($_POST['input_street']) || !isset($_POST['input_city']) || !isset($_POST['input_postal']) || !isset($_POST['input_skills']) || !isset($_POST['input_lv']) || !isset($_POST['input_mail']) || !isset($_POST['input_remun']) || !isset($_POST['input_duration']) || !isset($_POST['input_nb_ap'])){
    echo "Missing data ";
    echo "<a href='/controler/pages/index.php'>Back</a>";
    exit();
}

//Récupération des données
$title = $_POST['input_title'];
$desc = $_POST['input_desc'];
$companyName = $_POST['input_company_name'];
$street = $_POST['input_street'];
$city = $_POST['input_city'];
$postal = $_POST['input_postal'];
$skills = $_POST['input_skills'];
$lvl = $_POST['input_lv'];
$mail = $_POST['input_mail'];
$remun = $_POST['input_remun'];
$duration = $_POST['input_duration'];
$nb_ap = $_POST['input_nb_ap'];

//Création de l'utilisateur
Internship::createInternship($title, [0=>$skills], $lvl, $desc, $mail, $remun, $duration, ['street_address'=>$street, 'city'=>$city, 'postal_code'=>$postal], $companyName, true, $nb_ap);

header("Location: /controler/pages/personal_page.php");