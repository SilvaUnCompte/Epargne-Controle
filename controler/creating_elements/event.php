<?php
require($_SERVER['DOCUMENT_ROOT'] . '/database/connexion.php');
require($_SERVER['DOCUMENT_ROOT'] . '/database/tables/regular_event.php');

// Security (Need to be improved to check if the user is the owner of the event)
if (session_status() !== PHP_SESSION_ACTIVE) session_start();

if (!isset($_SESSION['email'])) {
    echo json_encode(['error' => 'Not logged']);
    exit;
}

echo $_GET["label"] . " " . $_GET["start"] . " " . $_GET["end"] . " " . $_GET["amount"] . " " . $_GET["frequency"] . " " . $_GET["category"] . " " . $_GET["id_account"];

RegularEvent::createRegularEvent($_GET["label"], $_GET["start"], $_GET["end"], $_GET["amount"], $_GET["frequency"], $_GET["category"], $_GET["id_account"]);