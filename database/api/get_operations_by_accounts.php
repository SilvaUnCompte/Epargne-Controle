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

if (isset($_GET["date"])) {
    $date = $_GET["date"];
} else {
    $date = date("Y-m-d");
}

$regularity = "";
if (isset($_GET["regularity"])) {
    $regularity = "AND regularity = " . $_GET["regularity"];
}

// Get all id accounts
foreach ($arg as $key => $value) {
    $accounts[] = $value->id_account;
}

$query = $db->prepare('SELECT * FROM operation WHERE id_account IN (' . implode(',', $accounts) . ') ' . $regularity . ' AND date <= \'' . $date . '\' ORDER BY date DESC LIMIT ' . $limit);
$query->execute();
$result = $query->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($result);
