<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/database/connexion.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/database/tables/user.php');

class Data
{
    public static function createPassword($rawPassword)
    {
        $salt = bin2hex(random_bytes(16));
        $hash = hash_pbkdf2("sha512", $rawPassword, $salt, 1000, 64);
        return array("salt" => $salt, "hash" => $hash);
    }


    public static function checkPassword($rawPassword, $salt, $hash)
    {
        $checkHash = hash_pbkdf2("sha512", $rawPassword, $salt, 1000, 64);
        return $checkHash == $hash;
    }


    public static function checkLogin($email, $password)
    {
        global $db;

        $query = $db->prepare('SELECT * FROM user WHERE email = :email');
        $query->execute(['email' => $email]);
        $result = $query->fetch();

        if (!$result) { // If account doesn't exist
            return 0;
        }

        $salt = $result['salt'];
        $hash = $result['password'];

        if (is_null($hash)) { // If account has no password, set it
            $user = new User($email);

            $new_password = Data::createPassword($password);
            $user->setPassword($new_password['hash']);
            $user->setSalt($new_password['salt']);
            $user->update();
            return 1;
        }

        return self::checkPassword($password, $salt, $hash);
    }
}
