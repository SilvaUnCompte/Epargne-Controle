<?php

require($_SERVER['DOCUMENT_ROOT'] . '/database/tables/user.php');
require($_SERVER['DOCUMENT_ROOT'] . '/controler/data.php');

if (isset($_POST['input_email']) && isset($_POST['input_password'])) {
	$email = $_POST['input_email'];
	$password = $_POST['input_password'];

	require($_SERVER['DOCUMENT_ROOT'] . "/controler/template_engine.php");
	$smarty->assign("title", "epargne-controle - Login");

	switch (Data::checkLogin($email, $password)) {
		case -1:
			$smarty->assign("state", 1); // mail inexistant
			$smarty->display("login.tpl");
			exit();
		case -2:
			$smarty->assign("state", 2); // mdp faux
			$smarty->display("login.tpl");
			exit();
		default:
			if (session_status() !== PHP_SESSION_ACTIVE) session_start();
			
			$currentUser = new User(Data::verifyEmailExist($email));
			
			$_SESSION['id'] = $currentUser->get_id();
			$_SESSION['firstname'] = $currentUser->get_firstname();
			$_SESSION['lastname'] = $currentUser->get_lastname();
			$_SESSION['email'] = $currentUser->get_email();
			$_SESSION['campus'] = $currentUser->get_campus();
			$_SESSION['promo'] = $currentUser->get_promo();
			$_SESSION['type'] = $currentUser->get_type();
			
			header("Location: /controler/pages/index.php");
			exit();
	}
} else {
	echo "Erreur d'authentification, champs incomplets";
	exit();
}
