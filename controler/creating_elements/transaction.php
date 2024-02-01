<?php
require($_SERVER['DOCUMENT_ROOT'] . '/database/connexion.php');
require($_SERVER['DOCUMENT_ROOT'] . '/database/tables/operation.php');
require($_SERVER['DOCUMENT_ROOT'] . '/database/tables/account.php');

// Security (Need to be improved to check if the user is the owner of the operation)
if (session_status() !== PHP_SESSION_ACTIVE) session_start();

if (!isset($_SESSION['email'])) {
    echo json_encode(['error' => 'Not logged']);
    exit;
}

$from = new account($_GET['from']);
$to = new account($_GET['to']);

$order = null;
if ($from->getType() == 0 && $to->getType() == 1) {
    $order = 0;
}
else if ($from->getType() == 1 && $to->getType() == 0) {
    $order = 7;
}
else {
    $order = 6;
}

Operation::createOperation($_GET['label'], $_GET['date'], -$_GET['amount'], $order, 0, $_GET['from']);
Operation::createOperation($_GET['label'], $_GET['date'], $_GET['amount'], $order, 0, $_GET['to']);