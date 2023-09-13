<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="/assets/images/icon.png" />
    <title>{$title}</title>
</head>

<link rel="stylesheet" href="/public/styles/login/login.css">


<section id="section-core">
    <div class="form-box">
        <div class="form-value">
            <form action="/controler/login/login.php" method="get">
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
                    <a href="#good-luck-bro">Forget Password?</a>
                </div>

                {if $error == (1)}
                    <p class="error">
                        Email or password incorrect
                    </p>
                {elseif $error == (2)}
                    <p class="success">
                        Password saved successfully
                    </p>
                {/if}

                <input type="submit" value="Login">
                <div class="register">
                    <p>Don't have an account? <a href="#">Call me</a></p>
                </div>
            </form>
        </div>
    </div>
</section>

<script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
<script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>

</body>

</html>