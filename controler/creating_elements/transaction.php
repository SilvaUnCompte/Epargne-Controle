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
if ($from->getType() == 1 && $to->getType() == 1) {
    $order = 6;
}
else if ($to->getType() == 0) {
    $order = 7;
}

// 0 -> 1 : 0 Saving
// 0 -> 0 : 7 Withdrawal
// 1 -> 0 : 7 Withdrawal
// 1 -> 1 : 6 Other

Operation::createOperation($_GET['label'], $_GET['date'], -$_GET['amount'], $order, 0, $_GET['from']);
Operation::createOperation($_GET['label'], $_GET['date'], $_GET['amount'], $order, 0, $_GET['to']);