<?php
require($_SERVER['DOCUMENT_ROOT'] . '/database/connexion.php');
require($_SERVER['DOCUMENT_ROOT'] . '/database/tables/regular_event.php');

if (session_status() !== PHP_SESSION_ACTIVE) session_start();

if (!isset($_SESSION['email'])) {
    echo json_encode(['error' => 'Not logged']);
    exit;
}

$id = $_GET['id'];
$label = $_GET['label'];
$amount = $_GET['amount'];
$start = $_GET['start'];
$end = $_GET['end'];
$frequency = $_GET['frequency'];
$category = $_GET['category'];

if (!isset($label) || !isset($amount) || !isset($start) || !isset($end) || !isset($frequency) || !isset($category) || !isset($id)) {
    echo json_encode(['error' => 'Missing parameters']);
    exit;
}

$event = new RegularEvent($id);
$event->setLabel($label);
$event->setAmount($amount);
$event->setStart($start);
$event->setEnd($end);
$event->getFrequencyType($frequency);
$event->setCategory($category);

$event->update();