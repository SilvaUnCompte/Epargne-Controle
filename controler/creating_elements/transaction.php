<?php
require($_SERVER['DOCUMENT_ROOT'] . '/database/connexion.php');
require($_SERVER['DOCUMENT_ROOT'] . '/database/tables/operation.php');

// Security (Need to be improved to check if the user is the owner of the operation)
if (session_status() !== PHP_SESSION_ACTIVE) session_start();

if (!isset($_SESSION['email'])) {
    echo json_encode(['error' => 'Not logged']);
    exit;
}

Operation::createOperation($_GET['label'], $_GET['date'], -$_GET['amount'], 5, 0, $_GET['from']);
Operation::createOperation($_GET['label'], $_GET['date'], $_GET['amount'], 5, 0, $_GET['to']);