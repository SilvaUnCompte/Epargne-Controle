<?php
header('Content-Type: application/json');
require($_SERVER['DOCUMENT_ROOT'] . '/database/tables/internship.php');
require($_SERVER['DOCUMENT_ROOT'] . '/database/tables/user.php');

// Securité
if (session_status() !== PHP_SESSION_ACTIVE) session_start();

if (!isset($_SESSION['id'])) {
    echo json_encode(['error' => 'Not logged']);
    exit;
}

$currentUser = new User($_SESSION['id']);
$currentInternship = new Internship($_GET['id']);

$currentUser->add_apply_count();
$currentUser->addWishList($currentInternship->get_id());
$currentUser->updateUser();
$currentInternship->set_applyCount();
$currentInternship->updateInternship();