<?php

require_once($_SERVER['DOCUMENT_ROOT'] . '/database/tables/user.php');

if (isset($_GET['input_email']) && isset($_GET['input_password'])) {

	$email = $_GET['input_email'];
	$password = $_GET['input_password'];

	if (User::checkLogin($email, $password)) {

		if (session_status() !== PHP_SESSION_ACTIVE) session_start();

		$user = new User($email);
		$_SESSION['email'] = $email;
		$_SESSION['username'] = $user->getUsername();

		header("Location: /controler/pages/index.php");
	} else {
		require($_SERVER['DOCUMENT_ROOT'] . "/assets/vendors/smarty/libs/Smarty.class.php");
		$smarty = new Smarty();
		$smarty->setTemplateDir($_SERVER['DOCUMENT_ROOT'] . '/public/templates/');
		$smarty->assign("title", "Epargne-controle - Login");
		$smarty->assign("error", 1);
		$smarty->display("login.tpl");
	}
} else {
	echo "Erreur d'authentification, champs incomplets";
	exit();
}
