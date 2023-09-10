{include file='helpers/header.tpl'}

<link rel="stylesheet" href="/public/styles/create/create.css">

<main id="basic-core">
    <div class="form-box">
        <h2>Ajouter une entreprise</h2>
        <form action="/controler/edit_company.php" method="post">
            <div class="form-row">
                <div class="form-line">
                    <label for="input-name">Nom</label>
                    <div class="form-group">
                        <input type="text" class="form-control" id="input-name" name="input_name"
                            placeholder="Nom de l'entreprise" value="{$name}" required>
                    </div>
                    <label for="input-desc">Description</label>
                    <div class="form-group">
                        <input type="textarea" class="form-control" id="input-desc" name="input_desc"
                            placeholder="Description..." value="{$desc}" required>
                    </div>
                    <label for="input_localisation">Localisations</label>
                    <div class="form-group">
                        <input type="text" class="form-control localisation-input" id="input_street" name="input_street"
                            placeholder="Numéro de rue" value="{$location[0]['street_address']}" required>
                        <input type="text" class="form-control localisation-input" id="input_city" name="input_city"
                            placeholder="Nom de la ville" value="{$location[0]['city']}" required>
                        <input type="text" class="form-control localisation-input" id="input_postal" name="input_postal"
                            placeholder="Code postal" value="{$location[0]['postal_code']}" required>
                    </div>
                    <label for="input-desc">Niveau de confiance</label>
                    <div class="form-group">
                        <input type="number" min="1" max="5" class="form-control" id="input-trust" name="input_trust"
                            placeholder="/5" value="{$trust}" required>
                    </div>
                </div>
                <img src="/assets/images/default.png" alt="add user" id="avatar">
            </div>
            <div class="form-group">
                <label for="input-visible">Visible :</label>
                <input type="checkbox" id="input-visible" name="input_visible" {if $visible == (1)} checked {/if}>
            </div>
            <input type="submit" value="Valider"><a href="/controler/pages/research.php"> <input type="button"
                    value="Annuler"> </a>
            <input type="text" class="hide" name="id_" value="{$id_}">
        </form>
    </div>
</main>

{include file="helpers/footer.tpl"}
<script src="/public/js/add_field/company.js"></script>