<?php
require($_SERVER['DOCUMENT_ROOT'] . '/database/tables/user.php');
require($_SERVER['DOCUMENT_ROOT'] . '/controler/data.php');

$test = new User("selyan.quesnot@gmail.com");


if(Data::checkLogin("selyan.quesnot@gmail.com","test")){
    echo "Connexion réussie";
} else {
    echo "Connexion échouée";
}