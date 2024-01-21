<?php
require($_SERVER['DOCUMENT_ROOT'] . '/database/connexion.php');
require($_SERVER['DOCUMENT_ROOT'] . '/database/tables/account.php');
require($_SERVER['DOCUMENT_ROOT'] . '/database/tables/operation.php');

if (session_status() !== PHP_SESSION_ACTIVE) session_start();

if (!isset($_SESSION['email'])) {
    echo json_encode(['error' => 'Not logged']);
    exit;
}

if (!isset($_GET['label']) || !isset($_GET['type']) || !isset($_GET['id']) || !isset($_GET['sold'])) {
    echo json_encode(['error' => 'Missing parameters']);
    exit;
}

$account = new Account($_GET['id']);
$account->setLabel($_GET['label']);
$account->setType($_GET['type']);

$prev_sold = Operation::getLastOperationSoldByAccount($_GET['id'], Date('Y-m-d'));

if ($_GET['sold'] - $prev_sold != 0) {
    Operation::createOperation("Balance update", Date('Y-m-d'), $_GET['sold'] - $prev_sold, 6, 0, $_GET['id']);
}

$account->update();
