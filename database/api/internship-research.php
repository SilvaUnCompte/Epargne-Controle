<?php
header('Content-Type: application/json');
require($_SERVER['DOCUMENT_ROOT'] . '/database/tables/internship.php');

$currentInternship = new Internship($_GET['id']);

$result = array();
$result['title'] = $currentInternship->get_title();
$result['skills'] = json_encode($currentInternship->get_skills());
$result['lvl'] = $currentInternship->get_lvl();
$result['desc'] = $currentInternship->get_desc();
$result['remuneration'] = $currentInternship->get_remuneration();
$result['duration'] = $currentInternship->get_duration();
$result['location'] = $currentInternship->get_location();
$result['company_name'] = $currentInternship->get_companyName();
$result['contactEmail'] = $currentInternship->get_contactEmail();
// $result['apply_count'] = $currentInternship->get_applyCount();

echo json_encode($result);