<?php
header('Content-Type: application/json');

require($_SERVER['DOCUMENT_ROOT'] . '/database/connexion.php');


// Security need to be improved (check if user is the owner of the account)
if (session_status() !== PHP_SESSION_ACTIVE) session_start();

if (!isset($_SESSION['email'])) {
    echo json_encode(['error' => 'Not logged']);
    exit;
}

$id_account = $_GET["id_account"];
$start = $_GET["start"];
$end = $_GET["end"];

$query = $db->prepare('SELECT id_operation,label,date,amount,new_sold,category FROM operation WHERE id_account = ' . $id_account . ' AND date >= \'' . $start . '\' AND date <= \'' . $end . '\' ORDER BY date ASC');
$query->execute();
$result = $query->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($result);