<?php
require($_SERVER['DOCUMENT_ROOT'] . '/database/tables/company.php');

// Securité
if (session_status() !== PHP_SESSION_ACTIVE) session_start();

if (!isset($_SESSION['id'])) {
    echo json_encode(['error' => 'Not logged']);
    exit;
}


$currentCompany = new Company($_GET['id']);
$currentCompany->addGrades($_SESSION['id'], $_GET['grade']);
$currentCompany->updateCompany();