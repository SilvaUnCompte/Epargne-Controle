<?php

require ($_SERVER['DOCUMENT_ROOT'].'/database/connexion.php');

class Company{

    public $companyArray;

    public $id;
    public $name;
    public $logo;
    public $desc;
    public $visible;
    public $sectors;
    public $pilotTrust;
    public $internships;
    public $locations;
    public $grades;

    public function __construct($id){
        global $company;
        if ($company->count(['_id' => intval($id)]) == 0) {
            echo header("HTTP/1.1 404");
            exit;
        }
        $this->companyArray = $company->findOne(['_id' => intval($id)]);
        $this->id = $this->companyArray['_id'];
        $this->name = $this->companyArray['name'];
        $this->logo = $this->companyArray['logo'];
        $this->desc = $this->companyArray['desc'];
        $this->visible = $this->companyArray['visible'];
        $this->sectors = $this->companyArray['sectors'];
        $this->pilotTrust = $this->companyArray['pilot_trust'];
        $this->internships = $this->companyArray['internships'];
        $this->locations = $this->companyArray['locations'];
        $this->grades = $this->companyArray['grades'];
    }

    public function get_id(){return $this->id;}
    public function get_name(){return $this->name;}
    public function get_desc(){return $this->desc;}
    public function get_visible(){return $this->visible;}
    public function get_sectors(){return $this->sectors;}
    public function get_pilotTrust(){return $this->pilotTrust;}
    public function get_internships(){return $this->internships;}
    public function get_locations(){return $this->locations;}
    public function get_grades(){return $this->grades;}

    public function set_name($string){$this->name = $string;}
    public function set_desc($string){$this->desc = $string;}
    public function set_visible($bool){$this->visible = $bool;}
    public function set_locations($string){$this->locations = $string;}
    public function addSector($string){
        foreach($this->sectors as $sector)if($sector == $string)return -1;
        array_push($this->sectors, $string);
        return 0;
    }
    public function removeSector($string){
        foreach($this->sectors as $i=>$sector){
            if($sector == $string){
                unset($this->sectors[$i]);
                return 0;
            }
        }
        return -1;
    }
    public function set_pilotTrust($float){$this->pilotTrust = $float;}
    public function addInternships($id){
        foreach($this->internships as $intership)if($intership['_id'] == $id)return -1;
        array_push($this->internships, ['id_internship' => $id, 'date' => date('d/m/Y')]);
        return 0;
    }
    public function removeInternships($id){
        foreach($this->internships as $i=>$intership){
            if($intership['_id'] == $id){
                unset($this->internships[$i]);
                return 0;
            }
        }
        return -1;
    }
    public function addLocations($streetAddress, $city, $postalCode){
        foreach($this->locations as $location){
            if($location['street_address'] == $streetAddress && $location['city'] == $city && $location['postal_code'] == $postalCode){
                return -1;
            }
        }
        $this->locations[] = ['street_address' => $streetAddress, 'city' => $city, 'postal_code' => $postalCode];
        return 0;
    }
    public function removeLocations($streetAddress, $city, $postalCode){
        foreach($this->locations as $i=>$location){
            if($location['street_address'] == $streetAddress && $location['city'] == $city && $location['postal_code'] == $postalCode){
                unset($this->locations[$i]);
                return 0;
            }
        }
        return -1;
    }
    public function addGrades($accountId, $entryGrade){
        foreach($this->grades as $grade){
            if($grade['id_account'] == intval($accountId)){
                return -1;
            }
        }
        $this->grades[] = ['id_account' => intval($accountId), 'grade' => intval($entryGrade)];
        return 0;
    }
    public function removeGrades($accountId){
        foreach($this->grades as $i=>$grade){
            if($grade['id_account'] == $accountId){
                unset($this->grades[$i]);
                return 0;
            }
        }
        return -1;
    }
    public function modifyGrades($accountId, $newGrade){
        foreach($this->grades as $i=>$grade){
            if($grade['id_account'] == $accountId){
                $this->grades[$i]['grade'] = $newGrade;
                return 0;
            }
        }
        return -1;
    }
    public function updateCompany(){
        global $company;
        $company->replaceOne(['_id' => $this->id], [
            "name" => $this->name,
            "logo" => $this->logo,
            "desc" => $this->desc,
            "visible" => $this->visible,
            "pilot_trust" => $this->pilotTrust,
            "internships" => $this->internships,
            "locations" => $this->locations,
            "grades" => $this->grades,
            "sectors" => $this->sectors
        ]);
    }
    public static function createCompany($name, $desc, $visible, $pilot_trust, $internships, $locations, $grades, $sectors, $logo=""){
        global $company;
        $company->insertOne([
            "_id"=> strval(time())+strval(random_int(1,1000000)),
            "name" => $name,
            "logo" => $logo,
            "desc" => $desc,
            "visible" => $visible,
            "pilot_trust" => intval($pilot_trust),
            "internships" => $internships,
            "locations" => $locations,
            "grades" => $grades,
            "sectors" => $sectors
        ]);
    }

    public static function deleteCompany($id){
        $deleted = new Company($id);
        $deleted->set_visible(false);
        $deleted->updateCompany();
    }
}

?>