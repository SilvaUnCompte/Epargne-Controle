<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" href="/assets/images/book.png" />
  <link rel="manifest" href="/public/manifest.json">
  <meta name="theme-color" content="#424549" />

  <link href="/assets/vendors/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <link href="/assets/vendors/fontawesome/css/all.min.css" rel="stylesheet">
  <link rel="stylesheet" href="/public/styles/generics/header/header.css">
  <link rel="stylesheet" href="/public/styles/generics/footer/footer.css">
  <title>{$title}</title>
</head>

<body>

  <header id="native-header">
    <nav aria-label="first_header" class="navbar navbar-dark bg-dark">
      <a href="/controler/pages/index.php"><img id="company_name" src="/assets/images/logo.webp" alt="epargne-controle logo"
          loading="lazy" width="300" height="77"></a>
      <div id="button_div_header">

        {if session_status() !== PHP_SESSION_ACTIVE}
          {session_start()}
        {/if}

        {if isset($smarty.session.firstname)}
          <a id="login_button" class="btn btn-primary" href="/controler/pages/personal_page.php">
            {$smarty.session.firstname} {$smarty.session.lastname}</a>
            <a href="/controler/pages/personal_page.php"><img id="account_avatar" src="/assets/images/avatar.svg" alt="Avatar image" width="50" height="50"
          loading="lazy"></a>
        {else}
          <a id="login_button" class="btn btn-primary" href="/controler/pages/login.php">Se connecter</a>
          <a href="/controler/pages/login.php"><img id="account_avatar" src="/assets/images/avatar.svg" alt="Avatar image" width="50" height="50"
          loading="lazy"></a>
        {/if}
        
      </div>
    </nav>

    <nav id="second_header">
      <ul class="navbar-nav me-auto mb-2 mb-xl-0">
        <li class="nav-item">
          <a id="nav-accueil" class="nav-link active" aria-current="page" href="/controler/pages/index.php">Accueil</a>
        </li>
        <li id="nav-recherche" class="nav-item">
          <a class="nav-link" href="/controler/pages/research.php">Rechercher</a>
        </li>
      </ul>
      <ul class="navbar-nav mb-2 mb-xl-0">
        <li class="nav-item">
          <a id="nav-tech" class="nav-link" href="#">Support technique ➔</a>
        </li>
      </ul>
    </nav>
</header>