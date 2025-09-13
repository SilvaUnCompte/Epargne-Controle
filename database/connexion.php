<?php


// Load environment variables from .env file
$envPath = $_SERVER['DOCUMENT_ROOT'] . '/.env';

if (file_exists($envPath)) {
    $lines = file($envPath);
    foreach ($lines as $line) {
        if (preg_match('/^([A-Z_]+)=(.*)$/', trim($line), $matches)) {
            putenv("{$matches[1]}={$matches[2]}");
        }
    }
}

$DB_PORT = getenv('DB_PORT');
$DB_HOST = getenv('DB_HOST');
$DB_USERNAME = getenv('DB_USERNAME');
$DB_PASSWORD = getenv('DB_PASSWORD');
$DB_NAME = getenv('DB_NAME');

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