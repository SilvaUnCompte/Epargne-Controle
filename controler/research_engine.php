<?php

require($_SERVER['DOCUMENT_ROOT'] . '/database/connexion.php');
class Search
{
    public static function researchCompany($text)
    {
        global $company;
        $resultsTab = $company->find([], ['projection' => ['_id' => 1, 'name' => 1, 'visible' => 1, 'pilot_trust' => 1, 'grades' => 1]]);
        foreach ($resultsTab as $doc) {
            $averageGrade = 0;
            foreach ($doc['grades'] as $grade) {
                $averageGrade += $grade['grade'];
            }
            if (str_contains(strtolower($doc['name']), strtolower($text)) && $doc['visible']) {
                echo '<div class="wrapper" value="' . $doc['_id'] . '">';
                echo '<div class="header header_home unselectable">' . $doc['name'] . '</div>';
                echo '<div class="content content_home">';
                echo '<p class="unselectable">Note du pilote : ' . $doc['pilot_trust'] . '</p>';
                $nbGrade = count($doc['grades']);
                echo '<p class="unselectable">' . ((($nbGrade) !== (0)) ? (round($averageGrade / $nbGrade, 1)."/5") : ("Aucune note")).'</p>';
                echo '</div>';
                echo '</div>';
            }
        }
    }
    public static function researchOffer($text)
    {
        global $internship;
        $resultsTab = $internship->find([], ['projection' => ['_id' => 1, 'title' => 1, 'lvl' => 1, 'duration' => 1, 'company_name' => 1, 'location' => 1, 'contactEmail' => 1, 'apply_count' => 1, 'enable' => 1]]);
        foreach ($resultsTab as $doc) {
            if (str_contains(strtolower($doc['title']), strtolower($text)) && $doc['enable']) {
                echo '<div class="wrapper" value="' . $doc['_id'] . '">';
                echo '<div class="header header_home unselectable">' . $doc['title'] . '</div>';
                echo '<div class="content content_home">';
                echo '<p class="unselectable">' . $doc['lvl'] . '</p>';
                echo '<p class="unselectable">' . $doc['duration'] . ' semaines </p>';
                echo '<p class="unselectable">' . $doc['location']['city'] . '</p>';
                echo '<p class="unselectable"><a href="mailto:' . $doc['contactEmail'] . '">' . $doc['contactEmail'] . '</a></p>';
                echo '<p class="unselectable">✉︎ ' . $doc['apply_count'] . '</p>';
                echo '</div>';
                echo '<img class="image" src="/assets/images/corner.png" alt=\'corner-image\'>';
                echo '</div>';
            }
        }
    }
}
