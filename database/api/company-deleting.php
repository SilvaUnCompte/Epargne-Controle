<?php
require($_SERVER['DOCUMENT_ROOT'] . '/database/tables/company.php');

// Securité
if (session_status() !== PHP_SESSION_ACTIVE) session_start();

if (!isset($_SESSION['id']) && $_SESSION['type'] > 0) {
    echo json_encode(['error' => 'Not logged']);
    exit;
}

Company::deleteCompany($_GET['id']);