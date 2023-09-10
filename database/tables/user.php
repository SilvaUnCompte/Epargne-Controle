<?php

require($_SERVER['DOCUMENT_ROOT'] . '/database/connexion.php');

class User
{
    // accès à la collection
    private $accountArray;
    private $id;
    private $firstname;
    private $lastname;
    private $email;
    private $password;
    private $campus;
    private $promo;
    private $apply_count;
    private $type;
    private $wishlist;

    public function __construct($id)
    {
        global $account;
        if ($account->count(['_id' => intval($id)]) == 0) {
            echo header("HTTP/1.1 404");
            exit;
        }
        $this->accountArray = $account->findOne(['_id' => intval($id)]);
        $this->id = $this->accountArray['_id'];
        $this->firstname = $this->accountArray['name']['first'];
        $this->lastname = $this->accountArray['name']['last'];
        $this->email = $this->accountArray['email'];
        $this->password = $this->accountArray['password'];
        $this->campus = $this->accountArray['campus'];
        $this->promo = $this->accountArray['promo'];
        $this->apply_count = $this->accountArray['apply_count'];
        $this->type = $this->accountArray['type'];
        $this->wishlist = $this->accountArray['wishlist'];
    }
    public function __destruct()
    {
        exit;
    }
    public function get_id()
    {
        return $this->id;
    }
    public function get_firstname()
    {
        return $this->firstname;
    }
    public function get_lastname()
    {
        return $this->lastname;
    }
    public function get_email()
    {
        return $this->email;
    }
    public function get_password()
    {
        return $this->password;
    }
    public function get_campus()
    {
        return $this->campus;
    }
    public function get_promo()
    {
        return $this->promo;
    }
    public function get_apply_count()
    {
        return $this->apply_count;
    }
    public function get_type()
    {
        return $this->type;
    }
    public function get_wishlist()
    {
        return $this->wishlist;
    }
    public function setFirstName($string)
    {
        $this->firstname = $string;
    }
    public function setLastName($string)
    {
        $this->lastname = $string;
    }
    public function setEmail($string)
    {
        $this->email = $string;
    }
    public function setPassword($hash, $salt)
    {
        $this->password = ['hash' => $hash, 'salt' => $salt];
    }
    public function setCampus($string)
    {
        $this->campus = $string;
    }
    public function setPromo($string)
    {
        $this->promo = $string;
    }
    public function add_apply_count()
    {
        $this->apply_count++;
    }
    public function setType($int)
    {
        $this->type = $int;
    }
    public function addWishList($id_internship)
    {
        $wish = $this->isAWish($id_internship);
        if ($wish == -1) {
            $this->wishlist[] = ['id_internship' => $id_internship, 'apply_date' => date('d/m/Y')];
            return 0;
        } else {
            return -1;
        }
    }
    public function removeWishList($id_internship)
    {
        $wish = $this->isAWish($id_internship);
        if ($wish != -1) {
            unset($this->wishlist[$wish]);
            return 0;
        } else {
            return -1;
        }
    }
    public function isAWish($idInternship)
    {
        foreach ($this->wishlist as $i => $wish) {
            if ($wish['id_internship'] == $idInternship) {
                return $i;
            }
        }
        return -1;
    }
    public static function createUser($firstname, $lastname, $email, $password, $campus, $promo, $type = 0)
    {
        global $account;
        if ($account->findOne(['email' => $email]) == null) {
            $account->insertOne([
                "_id" => strval(time()) + strval(random_int(1, 1000000)),
                "name" => [
                    "first" => $firstname,
                    "last" => $lastname
                ],
                "email" => $email,
                "password" => $password,
                "campus" => $campus,
                "promo" => $promo,
                "apply_count" => 0,
                "type" => intval($type),
                "wishlist" => []
            ]);
            return 0;
        } else {
            return -1;
        }
    }
    public function updateUser()
    {
        global $account;
        $account->replaceOne(['_id' => $this->id], [
            'name' => [
                'first' => $this->firstname,
                'last' => $this->lastname
            ],
            'email' => $this->email,
            'password' => $this->password,
            'campus' => $this->campus,
            'promo' => $this->promo,
            'apply_count' => Count($this->wishlist),
            "type" => $this->type,
            'wishlist' => $this->wishlist,
        ]);
    }
    public static function deleteUser($id)
    {
        global $account;
        $user = new User($id);
        $user->setType(-1);
        $user->setEmail("#" . $user->get_email());
        $user->updateUser();
    }
}
