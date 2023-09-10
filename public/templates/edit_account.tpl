{include file='helpers/header.tpl'}

<link rel="stylesheet" href="/public/styles/create/create.css">


<main id="basic-core">
    <div class="form-box">
        <h2>Edition de {$lastname} {$firstname}</h1>
            <form action="/controler/edit_account.php" method="post">
                <div class="form-row">
                    <div class="form-col">
                        <label>Informations de connexion</label>
                        <div class="form-group">
                            <input type="text" class="form-control" id="input_email" name="input_email"
                                placeholder="Email" required pattern="[^@\s]+@[^@\s]+.[^@\s]" value={$email}>
                            <input type="password" class="form-control" id="input_password" name="input_password"
                                placeholder="Mot de passe">
                        </div>
                        <label>Nom prenom</label>
                        <div class="form-group">
                            <input type="text" class="form-control" id="input_lastname" name="input_lastname"
                                placeholder="Nom" required pattern="^[a-zA-Z\s]+$" value="{$lastname}">
                            <input type="text" class="form-control" id="input_firstname" name="input_firstname"
                                placeholder="Prenom" required pattern="^[a-zA-Z\s]+$" value="{$firstname}">
                        </div>
                        <label>Informations d'école</label>
                        <div class="form-group">
                            <input type="text" class="form-control" id="input_campus" name="input_campus"
                                placeholder="Campus" required pattern="^[a-zA-Z\s]+$" value="{$campus}">
                            <input type="text" class="form-control" id="input_promotion" name="input_promotion"
                                placeholder="Promotion" required pattern="^[a-zA-Z0-9\s]+$" value="{$promo}">
                        </div>
                    </div>
                    <img src="/assets/images/default.png" alt="add user" id="avatar">
                </div>
                <input type="submit" value="Valider"><a href="/controler/pages/personal_page.php"> <input type="button" value="Annuler"> </a>
                <input type="text" class="hide" name="id_" value="{$id_}">
            </form>
    </div>
</main>

{include file="helpers/footer.tpl"}