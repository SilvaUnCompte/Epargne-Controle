<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" href="/assets/images/icon.png" />
  <link rel="manifest" href="/public/manifest.json">
  <meta name="theme-color" content="#424549" />

  <link rel="stylesheet" href="/public/styles/header/header.css">
  <link rel="stylesheet" href="/public/styles/footer/footer.css">
  <link rel="stylesheet" href="/public/styles/generics/generics.css">
  <title>{$title}</title>
</head>

<body>

  <header id="header">
    <nav aria-label="first_header">

      {if session_status() !== PHP_SESSION_ACTIVE}
        {session_start()}
      {/if}

      {* liste de menu *}
      <ul id="menu">
        <li><a href="#">Overview</a></li>
        <li><a href="#">Accounts</a></li>
        <li><a href="#">Analytics</a></li>
        <li><a href="#">Manage</a></li>
      </ul>

      <div id="account">
        <a id="username">
          {$smarty.session.username}
        </a>
        <input type="hidden" id="email" value="{$smarty.session.email}" />
        <a href="/controler/login/logout.php">
          <img id="exit_icon" src="/assets/images/exit.png" alt="exit" width="50" height="50" loading="lazy">
        </a>
      </div>
    </nav>
</header>