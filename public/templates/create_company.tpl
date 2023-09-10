{include file='helpers/header.tpl'}

<link rel="stylesheet" href="/public/styles/create/create.css">

<main id="basic-core">
    <div class="form-box">
        <h2>Ajouter une entreprise</h2>
        <form action="/controler/create_company.php" method="post">
            <div class="form-row">
                <div class="form-line">
                    <label for="input-name">Nom</label>
                    <div class="form-group">
                        <input type="text" class="form-control" id="input-name" name="input_name"
                            placeholder="Nom de l'entreprise" required>
                    </div>
                    <label for="input-desc">Description</label>
                    <div class="form-group">
                        <input type="textarea" class="form-control" id="input-desc" name="input_desc"
                            placeholder="Description..." required>
                    </div>
                    <label for="input_localisation">Localisations</label>
                    <div class="form-group">
                        <input type="text" class="form-control localisation-input" id="input_street" name="input_street"
                            placeholder="Numéro de rue" required>
                        <input type="text" class="form-control localisation-input" id="input_city" name="input_city"
                            placeholder="Nom de la ville" required>
                        <input type="text" class="form-control localisation-input" id="input_postal" name="input_postal"
                            placeholder="Code postal" required>
                        <button type="button" onclick="add_location()">+</button>
                    </div>
                    <div id="entry-address" class="entry-box"></div>
                        <label for="input_localisation">Secteur d'activité</label>
                    <div class="form-group">
                        <input type="text" class="form-control" id="input_sector" name="input_sector"
                            placeholder="Secteur d'activité" required>
                        <button type="button" onclick="add_sector()">+</button>
                    </div>
                    <div id="entry-sector" class="entry-box"></div>
                    <label for="input-desc">Niveau de confiance</label>
                    <div class="form-group">
                        <input type="number" min="1" max="5" class="form-control" id="input-trust" name="input_trust"
                            placeholder="/5" required>
                    </div>
                </div>
                <img src="/assets/images/default.png" alt="add user" id="avatar">
            </div>
            <div class="form-group">
                <label for="input-visible">Visible :</label>
                <input type="checkbox" id="input-visible" name="input_visible">
            </div>
            <nav id="form-button"><input type="submit" value="Valider" onclick="confirm()"><input type="reset"
                    onclick="clear_field()"></nav>

        </form>
    </div>
</main>

{include file="helpers/footer.tpl"}
<script src="/public/js/add_field/company.js"></script>