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

if (isset($_GET["date"])) {
    $date = $_GET["date"];
} else {
    $date = date("Y-m-d");
}

$limit = "";
if (isset($_GET["limit"])) {
    $limit = ' LIMIT ' . $_GET["limit"];
}

$regularity = "";
if (isset($_GET["regularity"])) {
    $regularity = "AND regularity = " . $_GET["regularity"];
}

foreach ($arg as $key => $value) {
    $accounts[] = $value->id_account;
}

$query = $db->prepare('SELECT * FROM operation WHERE id_account IN (' . implode(',', $accounts) . ') ' . $regularity . ' AND date <= \'' . $date . '\' ORDER BY date DESC' . $limit);
$query->execute();
$result = $query->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($result);
