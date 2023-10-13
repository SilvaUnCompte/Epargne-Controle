<?php
require($_SERVER['DOCUMENT_ROOT'] . '/database/connexion.php');
require($_SERVER['DOCUMENT_ROOT'] . '/database/tables/account.php');
require($_SERVER['DOCUMENT_ROOT'] . '/database/tables/operation.php');

if (session_status() !== PHP_SESSION_ACTIVE) session_start();

if (!isset($_SESSION['email'])) {
    echo json_encode(['error' => 'Not logged']);
    exit;
}

if (!isset($_GET['label']) || !isset($_GET['type']) || !isset($_GET['id'])) {
    echo json_encode(['error' => 'Missing parameters']);
    exit;
}

$account = new Account($_GET['id']);
$account->setLabel($_GET['label']);
$account->setType($_GET['type']);
$account->update();
