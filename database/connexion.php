<?php
    require ($_SERVER['DOCUMENT_ROOT'].'/assets/vendors/mongodb/vendor/autoload.php');

    $connection_chain = 'mongodb+srv://WilliamM:bP1j1rvVAGjBoGKQ@unjolienom.43m3hif.mongodb.net/test';
    $client = new MongoDB\Client($connection_chain);
    $account = $client->selectCollection('epargne-controle', 'account');
    $internship = $client->selectCollection('epargne-controle', 'internship');
    $company = $client->selectCollection('epargne-controle', 'company');
?>