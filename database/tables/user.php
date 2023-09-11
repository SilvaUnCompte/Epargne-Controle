<?php

require_once($_SERVER['DOCUMENT_ROOT'] . '/database/connexion.php');

class User
{
    private $email;
    private $username;
    private $password;
    private $salt;

    public function __construct($email)
    {
        global $db;

        $query = $db->prepare('SELECT * FROM user WHERE email = :email');
        $query->execute(['email' => $email]);
        $result = $query->fetch();

        if (!$result) {
            echo header("HTTP/1.1 401");
            exit;
        }

        $this->email = $result['email'];
        $this->username = $result['username'];
        $this->password = $result['password'];
        $this->salt = $result['salt'];
    }
    public function __destruct()
    {
        exit;
    }

    public function update()
    {
        global $db;
        echo "8";
        $query = $db->prepare('UPDATE user SET username = :username, password = :password, salt = :salt WHERE email = :email');
        echo "9";
        echo $this->email;
        echo $this->username;
        echo "pass " . $this->password . " ";
        echo "salt " . $this->salt . " ||";

        $query->execute([
            'email' => $this->email,
            'username' => $this->username,
            'password' => $this->password,
            'salt' => $this->salt
        ]);
        var_dump($query);
    }

    public function getUsername()
    {
        return $this->username;
    }
    public function getEmail()
    {
        return $this->email;
    }
    public function getPassword()
    {
        return $this->password;
    }
    public function getSalt()
    {
        return $this->salt;
    }
    public function setUsername($string)
    {
        $this->username = $string;
    }
    public function setPassword($hached_password)
    {
        $this->password = $hached_password;
    }
    public function setSalt($salt)
    {
        $this->salt = $salt;
    }
}
