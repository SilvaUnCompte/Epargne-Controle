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
	<link rel="stylesheet" href="/public/styles/header/header.css">
	<link rel="stylesheet" href="/public/styles/generics/generics.css">
	<title>{$title}</title>
</head>

<body id="test">

	<div id="dark"></div>

	<header id="header">
		<nav class="first-header">
			{if session_status() !== PHP_SESSION_ACTIVE}
				{session_start()}
			{/if}

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

	<ul id="side-menu">
		<div class="corner"></div>
		<li><a href="/controler/pages/index.php">Overview</a></li>
		<li><a href="/controler/pages/accounts.php">Accounts</a></li>
		<li><a href="#">Analytics</a></li>
		<li><a href="/controler/pages/operations.php">Operations</a></li>
		<li><a href="/controler/pages/events.php">Events</a></li>
</ul>