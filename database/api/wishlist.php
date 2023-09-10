<?php
header('Content-Type: application/json');
require($_SERVER['DOCUMENT_ROOT'] . '/database/tables/user.php');
require($_SERVER['DOCUMENT_ROOT'] . '/database/tables/internship.php');


// Securité
if (session_status() !== PHP_SESSION_ACTIVE) session_start();

if (!isset($_SESSION['id'])) {
    echo json_encode(['error' => 'Not logged']);
    exit;
}


$currentUser = new User($_SESSION['id']);
$curentPage = $_GET['page'] ?? 0;
$wishlist = [];

for ($i = 0; $i < count($currentUser->get_wishlist()); $i++) {
    $curentIntern[$i] = new Internship($currentUser->get_wishlist()[$i]['id_internship']);
    
    $wishlist[] = [
        'id' => $curentIntern[$i]->get_id(),
        'title' => $curentIntern[$i]->get_title(),
        // 'lvl' => $curentIntern[$i]->get_lvl(),
        // 'desc' => $curentIntern[$i]->get_desc(),
        'contactEmail' => $curentIntern[$i]->get_contactEmail(),
        // 'remuneration' => $curentIntern[$i]->get_remuneration(),
        // 'duration' => $curentIntern[$i]->get_duration(),
        // 'location' => $curentIntern[$i]->get_location(),
        'companyName' => $curentIntern[$i]->get_companyName(),
        'applyDate' => $currentUser->get_wishlist()[$i]['apply_date'],
        // 'applyCount' => $curentIntern[$i]->get_applyCount(),
        // 'enable' => $curentIntern[$i]->get_enable()
    ];
}

$result['wishCount'] = count($currentUser->get_wishlist());
$result['wishlist'] = array_slice($wishlist, $curentPage * 5, 5);

echo json_encode($result);