<?php
header('Content-Type: application/json');
require($_SERVER['DOCUMENT_ROOT'] . '/database/tables/user.php');

// Securité
if (session_status() !== PHP_SESSION_ACTIVE) session_start();

if (!isset($_SESSION['id']) && $_SESSION['type'] > 0) {
    echo json_encode(['error' => 'Not logged']);
    exit;
}

$id = $_GET['id'] ?? 1;
User::deleteUser($id);