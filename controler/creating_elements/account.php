<?php
require($_SERVER['DOCUMENT_ROOT'] . '/database/connexion.php');
require($_SERVER['DOCUMENT_ROOT'] . '/database/tables/account.php');
require($_SERVER['DOCUMENT_ROOT'] . '/database/tables/operation.php');

if (session_status() !== PHP_SESSION_ACTIVE) session_start();

if (!isset($_SESSION['email'])) {
    echo json_encode(['error' => 'Not logged']);
    exit;
}

if (!isset($_GET['label']) || !isset($_GET['type']) || !isset($_GET['sold'])) {
    echo json_encode(['error' => 'Missing parameters']);
    exit;
}

$id_account = Account::createAccount($_GET['label'], $_GET['type'], $_SESSION['email']);


if ($_GET['sold'] != '0') {
    Operation::createOperation("Init " . $_GET['label'] . " sold", "1999-01-01", $_GET['sold'], 5, 0, $id_account);
}
