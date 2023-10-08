<?php
header('Content-Type: application/json');

require($_SERVER['DOCUMENT_ROOT'] . '/database/connexion.php');
require($_SERVER['DOCUMENT_ROOT'] . '/database/tables/operation.php');


// Security
if (session_status() !== PHP_SESSION_ACTIVE) session_start();

if (!isset($_SESSION['email'])) {
    echo json_encode(['error' => 'Not logged']);
    exit;
}

$query = $db->prepare('SELECT id_account, label, type FROM bank_account WHERE user_email = :email ORDER BY type ASC');
$query->execute(['email' => $_SESSION['email']]);
$result = $query->fetchAll(PDO::FETCH_ASSOC);

foreach ($result as $key => $value) {
    $result[$key]['sold'] = Operation::getLastOperationSoldByAccount($value['id_account'], date('Y-m-d'));
}

echo json_encode($result);
