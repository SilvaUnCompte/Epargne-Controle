<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="/assets/images/book.png" />

    <link href="/assets/vendors/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="/assets/vendors/fontawesome/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/public/styles/generics/header/header.css">
    <link rel="stylesheet" href="/public/styles/generics/footer/footer.css">
    <title>{$title}</title>
</head>

<link rel="stylesheet" href="/public/styles/login/login.css">


<a id="home" href="/controler/pages/index.php">
    <ion-icon name="home-outline" id="home-outline"></ion-icon>
    <ion-icon name="home" id="home-full"></ion-icon>
</a>

<section id="section-core">
    <div class="form-box">
        <div class="form-value">
            <form action="/controler/login.php" method="post">
                <h2>Login</h2>
                <div class="input-box">
                    <ion-icon name="mail-outline"></ion-icon>
                    <input id="email_id" type="email" name="input_email" required placeholder=" ">
                    <label for="email_id">Email</label>
                </div>
                <div class="input-box">
                    <ion-icon name="lock-closed-outline"></ion-icon>
                    <input id="password_id" type="password" name="input_password" required placeholder=" ">
                    <label for="password_id">Password</label>
                </div>
                <div class="forget">
                    <a href="#">Forget Password?</a>
                </div>
                <input type="submit" value="Login">
                <div class="register">
                    <p>Don't have an account? <a href="#">Call your pilot</a></p>
                    <p class="error">
                        {if $state == (1)}
                        Ce mail n'existe pas
                        {elseif $state == (2)}
                        Mot de passe incorrect
                        {/if}
                    </p>
                </div>
            </form>
        </div>
    </div>
</section>

<script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
<script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>

</body>

</html>