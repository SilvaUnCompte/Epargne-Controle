<?php
require($_SERVER['DOCUMENT_ROOT'] . '/database/connexion.php');
require($_SERVER['DOCUMENT_ROOT'] . '/database/tables/user.php');
require($_SERVER['DOCUMENT_ROOT'] . '/database/tables/account.php');
require($_SERVER['DOCUMENT_ROOT'] . '/database/tables/operation.php');
require($_SERVER['DOCUMENT_ROOT'] . '/database/tables/regular_event.php');

// $user = new User("selyan.quesnot@gmail.com");


// if(User::checkLogin("selyan.quesnot@gmail.com","test")){
//     echo "Connexion réussie || ";
// } else {
//     echo "Connexion échouée || ";
// }

// var_dump(Account::getAccountsByUser($user->getEmail()));

// echo " || ";

// var_dump(Operation::getOperationsByAccount(1));

// $t = Operation::getLastOperationSoldByAccount(1, "2021-01-05");
// var_dump($t);

// $query = $db->prepare('DELETE FROM operation');
// $query->execute();
// $query = $db->prepare('DELETE FROM regular_event');
// $query->execute();

// $operation = new Operation(227);
// $operation->setAmount(45);
// $operation->update();

// Operation::deleteOperation(543);

// Operation::createOperation("test", "2021-01-12", 1, 0, 0, 1);

// RegularEvent::createRegularEvent("test", "2021-01-01", "2021-01-15", 100, 0, 0, 1);

$reg = new RegularEvent(26);
$reg->setAmount(5);
$reg->update();