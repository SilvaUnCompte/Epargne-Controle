<?php
    require ($_SERVER['DOCUMENT_ROOT'].'/database/connexion.php');
    class Data{
        public static function createPassword($rawPassword){
            $salt = bin2hex(random_bytes(16));
            $hash = hash_pbkdf2("sha512", $rawPassword, $salt, 1000, 64);
            return array("salt" => $salt, "hash" => $hash);
        }
        public static function checkPassword($rawPassword, $salt, $hash){
            $checkHash = hash_pbkdf2("sha512", $rawPassword, $salt, 1000, 64);
            return $checkHash == $hash;
        }
        public static function verifyEmailExist($email){
            global $account;
            if($account->findOne(['email' => $email]) == null){
                return -1;
            }else{
                return $account->findOne(["email" => $email], ['projection' => []])['_id'];
            }
        }
        public static function checkLogin($email, $password){
            global $account;
            $accountId = Data::verifyEmailExist($email);
            if($accountId!= -1){
                $passwordTab = $account->findOne(["_id" => $accountId], ['projection' => ["_id" => 0, "password" => 1]]);
                if(Data::checkPassword($password, $passwordTab["password"]["salt"], $passwordTab["password"]['hash'])){
                    return 0;
                }else{
                    return -2;
                }
            }else{
                return -1;
            }
        }
        public static function get_researchOffersFilters($type){
            global $internship;
            if($type == 1){
                $resultsTab = $internship->find([],['projection' => ['_id' => 0, 'lvl' => 1]]);
                $studyLevels = array();
                foreach($resultsTab as $element){
                    if(!in_array($element['lvl'], $studyLevels)){
                        $studyLevels[$element['lvl']] = 1;
                    }else{
                        $studyLevels[$element['lvl']] += 1;
                    }
                }
                echo '<div class="filter">';
                echo '<div class="filter-title first">';
                echo '<h1>Niveau(x) d\'étude</h1>';
                echo '</div>';
                foreach($studyLevels as $element => $n){
                    echo '<div class="filters">';
                    echo '<div>';
                    echo '<input type="checkbox" name="schoolLevel" value='.$element.'>';
                    echo "<label>$element ($n)</label>";
                    echo '</div>';
                    echo '</div>';
                }
                echo '</div>';
            }elseif($type == 2){
                $resultsTab = $internship->find([],['projection' => ['_id' => 0, 'company_name' => 1]]);
                $companyNames = array();
                foreach($resultsTab as $element){
                    if(!in_array($element['company_name'], $companyNames)){
                        $companyNames[$element['company_name']] = 1;
                    }else{
                        $companyNames[$element['company_name']] += 1;
                    }
                }
                echo '<div class="filter">';
                echo '<div class="filter-title first">';
                echo '<h1>Entreprises</h1>';
                echo '</div>';
                foreach($companyNames as $element => $n){
                    echo '<div class="filters">';
                    echo '<div>';
                    echo '<input type="checkbox" name="typeRecherche">';
                    echo "<label>$element ($n)</label>";
                    echo '</div>';
                    echo '</div>';
                }
                echo '</div>';
            }
        }
        public static function durationFilter(){
            echo '<div class="filter">';
            echo '<div class="filter-title first">';
            echo '<h1>Durée du stage</h1>';
            echo '</div>';
            echo '<div class="filters duration">';
            echo '<div>';
            echo '<label>min</label>';
            echo '<input id="min-entry" type="number" min=1 max=28 name="min-duration">';
            echo '</div>';
            echo '<div>';
            echo '<label>max</label>';
            echo '<input id="max-entry" type="number" min=1 max=28 name="max-duration">';
            echo '</div>';
            echo '</div>';
            echo '</div>';
        }
        public static function get_researchCompanyFilters($type){
            global $company;
            if($type == 1){
                $resultsTab = $company->find([],['projection' => ['_id' => 0, 'sectors' => 1]]);
                $sectorsTab = array();
                foreach($resultsTab as $sectors1){
                    foreach($sectors1 as $n => $sectors2){
                        foreach($sectors2 as $n => $sector){
                            if(!(in_array($sector, array_keys($sectorsTab)))){
                                $sectorsTab[$sector] = 1;
                            }else{
                                $sectorsTab[$sector] += 1;
                            }
                        }
                    }
                }
                echo '<div class="filter">';
                echo '<div class="filter-title first">';
                echo '<h1>Secteurs d\'activité</h1>';
                echo '</div>';
                foreach($sectorsTab as $element => $n){
                    echo '<div class="filters">';
                    echo '<div>';
                    echo '<input type="checkbox" name="activitySectors" value='.$element.'>';
                    echo "<label>$element ($n)</label>";
                    echo '</div>';
                    echo '</div>';
                }
                echo '</div>';
            }elseif($type == 2){
                $resultsTab = $company->find([],['projection' => ['_id' => 0, 'grades' => 1]]);
                $gradesTab = array();
                foreach($resultsTab as $grades){
                    foreach($grades as $grade){
                        foreach($grade as $element){
                            if(!(in_array($element['grade'], array_keys($gradesTab)))){
                                $gradesTab[$element['grade']] = 1;
                            }else{
                                $gradesTab[$element['grade']] += 1;
                            }
                        }
                    }
                }
                echo '<div class="filter">';
                echo '<div class="filter-title first">';
                echo '<h1>Notes</h1>';
                echo '</div>';
                foreach($gradesTab as $element => $n){
                    echo '<div class="filters">';
                    echo '<div>';
                    echo '<input type="radio" name="grades" value='.$element.'>';
                    echo "<label>$element ($n)</label>";
                    echo '</div>';
                    echo '</div>';
                }
                echo '</div>';
            }
        }
    }
