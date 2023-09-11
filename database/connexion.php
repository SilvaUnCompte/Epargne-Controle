<?php

$DB_HOST = "db";
$DB_USERNAME = "user";
$DB_PASSWORD = "pass";
$DB_NAME = "epargne-controle";

global $db;

// Use env variables to connect to the database
try {
    $cnx = "mysql:host={$DB_HOST};dbname={$DB_NAME}";
    $options = array(
        PDO::MYSQL_ATTR_SSL_CA => $_SERVER['DOCUMENT_ROOT'] . "../../../../etc/ssl/certs/ca-certificates.crt", // TODO: Change this path
    );
    $db = new PDO($cnx, $DB_USERNAME, $DB_PASSWORD, $options);
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
    exit();
}

// // Query to fetch list of tables
// $query = "SHOW TABLES";
// $stmt = $pdo->query($query);
// $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);

// if (!empty($tables)) {
//     echo "Tables in the database:\n";
//     foreach ($tables as $table) {
//         echo "- $table\n";
//     }
// } else {
//     echo "Successfully ran the query. No tables were found in the database.\n";
// }
