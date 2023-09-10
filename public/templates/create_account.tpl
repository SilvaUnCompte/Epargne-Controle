{include file='helpers/header.tpl'}

<link rel="stylesheet" href="/public/styles/create/create.css">


<main id="basic-core">
    <div class="form-box">
        <h2>Ajouter un {$account_type == (1) ? 'pilote' : 'etudiant'}</h1>
            <form action="/controler/create_account.php" method="post">
                <div class="form-row">
                    <div class="form-col">
                        <label>Informations de connexion</label>
                        <div class="form-group">
                            <input type="text" class="form-control" id="input_email" name="input_email" placeholder="Email" required
                                pattern="[^@\s]+@[^@\s]+.[^@\s]">
                            <input type="password" class="form-control" id="input_password" name="input_password" placeholder="Mot de passe"
                                required>
                        </div>
                        <label>Nom prenom</label>
                        <div class="form-group">
                            <input type="text" class="form-control" id="input_lastname" name="input_lastname" placeholder="Nom" required
                                pattern="^[a-zA-Z\s]+$">
                            <input type="text" class="form-control" id="input_firstname" name="input_firstname" placeholder="Prenom" required
                                pattern="^[a-zA-Z\s]+$">
                        </div>
                        <label>Informations d'école</label>
                        <div class="form-group">
                            <input type="text" class="form-control" id="input_campus" name="input_campus" placeholder="Campus" required
                                pattern="^[a-zA-Z\s]+$">
                            <input type="text" class="form-control" id="input_promotion" name="input_promotion" placeholder="Promotion"
                                required pattern="^[a-zA-Z0-9\s]+$">
                        </div>
                    </div>
                    <img src="/assets/images/default.png" alt="add user" id="avatar">
                </div>
                <input type="submit" value="Valider"><input type="reset">
                <input type="text" class="hide" name="input_type" value="{$account_type}">
            </form>
    </div>
</main>

{include file="helpers/footer.tpl"}