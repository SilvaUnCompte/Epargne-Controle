<?php
require($_SERVER['DOCUMENT_ROOT'].'/database/tables/user.php');
require($_SERVER['DOCUMENT_ROOT'].'/controler/data.php');

if(!isset($_POST['input_firstname']) || !isset($_POST['input_lastname']) || !isset($_POST['input_email']) || !isset($_POST['input_campus']) || !isset($_POST['input_promotion']) || !isset($_POST['id_'])){
    echo $_POST['input_firstname'];
    echo $_POST['input_lastname'];
    echo $_POST['input_email'];
    echo $_POST['input_campus'];
    echo $_POST['input_promotion'];
    echo $_POST['input_type'];

    echo "Missing data ";
    echo "<a href='/controler/pages/index.php'>Back</a>";
    exit();
}

$id = $_POST['id_'];

$editedUser = new User($id);

$editedUser->setFirstName($_POST['input_firstname']);
$editedUser->setLastName($_POST['input_lastname']);
$editedUser->setEmail($_POST['input_email']);
$editedUser->setCampus($_POST['input_campus']);
$editedUser->setPromo($_POST['input_promotion']);

$editedUser->updateUser();

header("Location: /controler/pages/personal_page.php");