<?php

$DB_HOST = "db";
$DB_USERNAME = "hcapbdpl2iqmlomomdkl";
$DB_PASSWORD = "pscale_pw_Y7qEQGy3bOkyx9toB5mLiSHFKEkH5PpyHGf0DuHII32";
$DB_NAME = "epargne-controle";

// Use env variables to connect to the database
$dsn = "mysql:host={$DB_HOST};dbname={$DB_NAME}";
$options = array(
    PDO::MYSQL_ATTR_SSL_CA => $_SERVER['DOCUMENT_ROOT']."../../../../etc/ssl/certs/ca-certificates.crt", // TODO: Change this path
);
$pdo = new PDO($dsn, $DB_USERNAME, $DB_PASSWORD, $options);

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
