<?php
header('Content-Type: application/json');

require($_SERVER['DOCUMENT_ROOT'] . '/database/connexion.php');
require($_SERVER['DOCUMENT_ROOT'] . '/database/tables/operation_type.php');


// Security
if (session_status() !== PHP_SESSION_ACTIVE) session_start();

if (isset($_SESSION['type'])) {
    $type = json_decode($_GET["type"]);
    echo json_encode(OperationType::getByAccountType($type));
    exit;
}

echo json_encode(OperationType::getAll());
