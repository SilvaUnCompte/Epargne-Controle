<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="icon" href="/assets/images/icon.png" />
	<link rel="manifest" href="/public/manifest.json">
	<meta name="theme-color" content="#424549" />

	<script src="/public/js/navbar.js" type="text/javascript"></script>
	<script src="/public/js/popup.js" type="text/javascript"></script>
	<link rel="stylesheet" href="/public/styles/header/header.css">
	<link rel="stylesheet" href="/public/styles/generics/generics.css">
	<link rel="stylesheet" href="/public/styles/popup/popup.css">
	<title>{$title}</title>
</head>

<body>

	<div id="dark"></div>

	<header id="header">
		<nav class="first-header">
			<img id="navicon" src="/assets/images/navicon.webp" alt="navicon" loading="lazy" onclick="show_navbar()">
			<a id="page-name">{$page_name}</a>

			<div id="account">
				<a id="username">
					{$smarty.session.username}
				</a>
				<a href="/controler/login/logout.php">
					<img id="exit_icon" src="/assets/images/exit.png" alt="exit" width="50" height="50" loading="lazy">
				</a>
			</div>
		</nav>
	</header>

	<div class="corner-back"></div>
	<ul id="side-menu">
		<div class="corner"></div>
		<li><a href="/controler/pages/index.php">Overview</a></li>
		<li><a href="/controler/pages/accounts.php">Accounts</a></li>
		<li><a href="/controler/pages/budget.php">Budget</a></li>
		<li><a href="/controler/pages/analytics.php">Analytics</a></li>
		<li><a href="/controler/pages/operations.php">Operations</a></li>
		<li><a href="/controler/pages/verification.php">Verification</a></li>
		<li><a href="/controler/pages/events.php">Events</a></li>
</ul>