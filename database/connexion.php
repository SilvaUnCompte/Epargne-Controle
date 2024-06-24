<?php

// $DB_HOST = "host";
// $DB_USERNAME = "user";
// $DB_PASSWORD = "pass";
// $DB_NAME = "EpargneControle";
$DB_PORT = "3306";

$DB_HOST = "host";
$DB_USERNAME = "user";
$DB_PASSWORD = "password";
$DB_NAME = "epargne-controle";

global $db;

// Use env variables to connect to the database
try {
    $cnx = 'mysql:host='.$DB_HOST.';port='.$DB_PORT.';dbname='.$DB_NAME.'';
    $options = array(
        PDO::MYSQL_ATTR_SSL_CA => $_SERVER['DOCUMENT_ROOT'] . "../../../../etc/ssl/certs/ca-certificates.crt", // TODO: Change this path
    );
    $db = new PDO($cnx, $DB_USERNAME, $DB_PASSWORD);
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
    exit();
}