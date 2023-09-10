<?php
header('Content-Type: application/json');
require($_SERVER['DOCUMENT_ROOT'] . '/database/tables/company.php');

$currentCompany = new Company($_GET['id']);

$result = array();
$result['name'] = $currentCompany->get_name();
$result['desc'] = $currentCompany->get_desc();
$result['visible'] = $currentCompany->get_visible();
$result['desc'] = $currentCompany->get_desc();
$result['pilot_trust'] = $currentCompany->get_pilotTrust();
$result['internships'] = $currentCompany->get_internships();
$result['locations'] = $currentCompany->get_locations();
$result['sectors'] = $currentCompany->get_sectors();

$averageGrade = 0;
foreach ($currentCompany->get_grades() as $grade) {
    $averageGrade += $grade['grade'];
}

$result['avrage'] = count($currentCompany->get_grades()) != 0 ? round($averageGrade / count($currentCompany->get_grades()),1) : "Acune note";

echo json_encode($result);