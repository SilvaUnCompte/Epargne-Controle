<?php
header('Content-Type: application/json');

require($_SERVER['DOCUMENT_ROOT'] . '/database/connexion.php');


// Security
if (session_status() !== PHP_SESSION_ACTIVE) session_start();

if (!isset($_SESSION['email'])) {
    echo json_encode(['error' => 'Not logged']);
    exit;
}

$arg = json_decode($_GET["accounts"]);
$limit = json_decode($_GET["limit"]);

// Get all id accounts
foreach ($arg as $key => $value) {
    $accounts[] = $value->id_account;
}

$query = $db->prepare('SELECT * FROM operation WHERE id_account IN (' . implode(',', $accounts) . ') ORDER BY date ASC LIMIT '.$limit);
$query->execute();
$result = $query->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($result);