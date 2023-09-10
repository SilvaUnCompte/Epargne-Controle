<?php

require ($_SERVER['DOCUMENT_ROOT'].'/database/connexion.php');

class Internship{
    private $internshipArray;
    private $id;
    private $title;
    private $skills;
    private $lvl;
    private $desc;
    private $contactEmail;
    private $remuneration;
    private $duration;
    private $location;
    private $companyName;
    private $applyCount;
    private $enable;

    public function  __construct($id){
        global $internship;
        if ($internship->count(['_id' => intval($id)]) == 0) {
            echo header("HTTP/1.1 404");
            exit;
        }
        $this->internshipArray = $internship->findOne(['_id' => intval($id)]);
        $this->id = $this->internshipArray['_id'];
        $this->title = $this->internshipArray['title'];
        $this->skills = $this->internshipArray['skills'];
        $this->lvl = $this->internshipArray['lvl'];
        $this->desc = $this->internshipArray['desc'];
        $this->contactEmail = $this->internshipArray['contactEmail'];
        $this->remuneration = $this->internshipArray['remuneration'];
        $this->duration = $this->internshipArray['duration'];
        $this->location = $this->internshipArray['location'];
        $this->companyName = $this->internshipArray['company_name'];
        $this->applyCount = $this->internshipArray['apply_count'];
        $this->enable = $this->internshipArray['enable'];
    }
    public function __destruct(){exit;}
    public function get_id(){return $this->id;}
    public function get_title(){return $this->title;}
    public function get_skills(){return $this->skills;}
    public function get_lvl(){return $this->lvl;}
    public function get_desc(){return $this->desc;}
    public function get_contactEmail(){return $this->contactEmail;}
    public function get_remuneration(){return $this->remuneration;}
    public function get_duration(){return $this->duration;}
    public function get_location(){return $this->location;}
    public function get_companyName(){return $this->companyName;}
    public function get_applyCount(){return $this->applyCount;}
    public function get_enable(){return $this->enable;}
    public function set_title($string){$this->title = $string;}
    public function set_skills($string){
        if(!in_array($this->skills, $string)){array_push($this->skills, $string);}
    }
    public function set_lvl($string){$this->lvl = $string;}
    public function set_desc($longString){$this->desc = $longString;}
    public function set_contactEmail($string){$this->contactEmail = $string;}
    public function set_remuneration($float){$this->remuneration = $float;}
    public function set_duration($int){$this->duration = $int;}
    public function set_location($streetAddress, $city, $postalCode){
        $this->location = ['street_address' => $streetAddress, 'city' => $city, 'postal_code' => $postalCode];
    }
    public function set_companyName($string){$this->companyName = $string;}
    public function set_applyCount(){$this->applyCount+=1;}
    public function set_enable($bool){$this->enable = $bool;}
    public function updateInternship(){
        global $internship;
        $internship->replaceOne(['_id' => $this->id], [
            "title" => $this->title,
            "skills" => $this->skills,
            "lvl" => $this->lvl,
            "desc" => $this->desc,
            "contactEmail" => $this->contactEmail,
            "remuneration" => $this->remuneration,
            "duration" => $this->duration,
            "location" => $this->location,
            "company_name" => $this->companyName,
            "apply_count" => $this->applyCount,
            "enable" => $this->enable
        ]);
    }
    public static function createInternship($title, $skills, $lvl, $desc, $contactEmail, $remuneration, $duration, $location, $companyName, $enable, $nb_apply=0){
        global $internship;
        if ($internship->findOne(['title' => $title, 'company_name' => $companyName]) == null)
        {
            $internship->insertOne([
                "_id"=> strval(time())+strval(random_int(1,1000000)),
                "title" => $title,
                "skills" => $skills,
                "lvl" => $lvl,
                "desc" => $desc,
                "contactEmail" => $contactEmail,
                "remuneration" => intval($remuneration),
                "duration" => intval($duration),
                "location" => $location,
                "company_name" => $companyName,
                "apply_count" => intval($nb_apply),
                "enable" => $enable
            ]);
            return 0;
        }else {
            return -1;
        }
    }
    public static function deleteInternship($id){
        $deleted = new Internship($id);
        $deleted->set_enable(false);
        $deleted->updateInternship();
    }
}
?>