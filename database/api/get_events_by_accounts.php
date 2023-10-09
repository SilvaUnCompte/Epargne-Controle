<?php
header('Content-Type: application/json');

require($_SERVER['DOCUMENT_ROOT'] . '/database/connexion.php');


// Security need to be improved !!!!
if (session_status() !== PHP_SESSION_ACTIVE) session_start();

if (!isset($_SESSION['email'])) {
    echo json_encode(['error' => 'Not logged']);
    exit;
}

$arg = json_decode($_GET["accounts"]);

if (isset($_GET["date"])) {
    $date = $_GET["date"];
} else {
    $date = date("Y-m-d");
}


// Get all id accounts
foreach ($arg as $key => $value) {
    $accounts[] = $value->id_account;
}

$query = $db->prepare('SELECT * FROM regular_event WHERE id_account IN (' . implode(',', $accounts) . ') ' . ' AND end >= \'' . $date . '\' ORDER BY start ASC');
$query->execute();
$result = $query->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($result);
