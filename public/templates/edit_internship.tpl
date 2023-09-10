{include file='helpers/header.tpl'}

<link rel="stylesheet" href="/public/styles/create/create.css">

<main id="basic-core">
    <div class="form-box">
        <h2>Modifier une offre de stage</h2>
        <form action="/controler/edit_internship.php" method="post">
            <div class="form-row">
                <div class="form-line">
                    <label for="input-title">Intitulé</label>
                    <div class="form-group">
                        <input type="text" class="form-control" id="input-name" name="input_title"
                            placeholder="Nom du stage.." value="{$title_}" required>
                    </div>
                    <label for="input-desc">Description</label>
                    <div class="form-group">
                        <input type="textarea" class="form-control" id="input-desc" name="input_desc"
                            placeholder="Description..." value="{$desc}" required>
                    </div>
                    <label for="input-company-name">Nom de l'entreprise hôte</label>
                    <div class="form-group">
                        <input type="text" class="form-control" id="input-company-name" name="input_company_name"
                            placeholder="Nom de l'entreprise hôte" value="{$companyName}" required>
                    </div>
                    <label for="input_localisation">Localisations</label>
                    <div class="form-group">
                        <input type="text" class="form-control localisation-input" id="input_street" name="input_street"
                            placeholder="Numéro de rue" value="{$location['street_address']}" required>
                        <input type="text" class="form-control localisation-input" id="input_city" name="input_city"
                            placeholder="Nom de la ville" value="{$location['city']}" required>
                        <input type="text" class="form-control localisation-input" id="input_postal" name="input_postal"
                            placeholder="Code postal" value="{$location['postal_code']}" required>
                    </div>
                    <label for="input-lv">Niveau d'étude recherché</label>
                    <div class="form-group">
                        <input type="textarea" class="form-control" id="input-lv" name="input_lv"
                            placeholder="Niveau d'étude recherché" value="{$lvl}" required>
                    </div>
                    <label for="input-mail">Mail de contact</label>
                    <div class="form-group">
                        <input type="email" class="form-control" id="input-mail" name="input_mail"
                            placeholder="Mail de contact" value="{$contactEmail}" required>
                    </div>
                    <label for="input-remun">Rémunération mensuel (€)</label>
                    <div class="form-group">
                        <input type="number" min="0" class="form-control" id="input-remun" name="input_remun"
                            placeholder="Rémunération mensuel (€)" value="{$remuneration}" required>
                    </div>
                    <label for="input-duration">Durée (en semaine)</label>
                    <div class="form-group">
                        <input type="number" min="2" max="26" class="form-control" id="input-duration"
                            name="input_duration" placeholder="Durée (en semaine)" value="{$duration}" required>
                    </div>
                </div>
            </div>
            <input type="submit" value="Valider"><a href="/controler/pages/research.php"> <input type="button" value="Annuler"> </a>
                <input type="text" class="hide" name="id_" value="{$id_}">
        </form>
    </div>
</main>

{include file="helpers/footer.tpl"}
<script src="/public/js/add_field/company.js"></script>