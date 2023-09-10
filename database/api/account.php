<?php
header('Content-Type: application/json');
require($_SERVER['DOCUMENT_ROOT'] . '/database/tables/user.php');

// Securité
if (session_status() !== PHP_SESSION_ACTIVE) session_start();

if (!isset($_SESSION['id'])) {
    echo json_encode(['error' => 'Not logged']);
    exit;
}

$research = $_GET['search'] ?? '';
$type = $_GET['type'] ?? 0;

$resultsTab = $account->find(['type' => intval($type)], ['projection' => ['_id' => 1, 'apply_count' => 1, 'name' => 1,'type' => 1]]);
$result = array();
foreach ($resultsTab as $pilot) {
    if (str_contains(strtolower($pilot['name']['first']) . ' ' . strtolower($pilot['name']['last']), strtolower($research))) {
        array_push($result, $pilot);
    }
}

$result = array_slice($result, 0, 5);

echo json_encode($result);