{include file='helpers/header.tpl'}

<link rel="stylesheet" href="/public/styles/create/create.css">
<link rel="stylesheet" href="/public/styles/profile/profile.css">

<main id="basic-core">
    <div class="form-box">
        <div class="form-row informations">
            <div class="form-col">
                <label>Vos informations : </label>
                <div class="text-row">
                    <div class="informations-div space">
                        <div class="form-col">
                            <div class="form-col info-col">
                                <div class='info-div'>
                                    <p class="text-data"><b>Nom :</b></p>
                                    <p class="text-data"><b>Prénom :</b></p>
                                    <p class="text-data"><b>Rôle :</b></p>
                                </div>
                                <div class='info-div'>
                                    <p class="text-data">{$smarty.session.lastname}</p>
                                    <p class="text-data">{$smarty.session.firstname}</p>
                                    <p class="text-data">
                                        {if $smarty.session.type == (0)}
                                            Etudiant
                                        {elseif $smarty.session.type == (1)}
                                            Pilote
                                        {else}
                                            Administrateur
                                        {/if}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="form-col">
                            <div class="form-col info-col">
                                <div class='info-div'>
                                    <p class="text-data"><b>Campus :</b></p>
                                    <p class="text-data"><b>Promotion :</b></p>
                                </div>
                                <div class='info-div'>
                                    <p class="text-data">{$smarty.session.campus}</p>
                                    <p class="text-data">{$smarty.session.promo}</p>
                                </div>
                            </div>
                        </div>
                        <a href="/controler/logout.php" id="logout-btn"> <button> Déconnexion </button></a>
                    </div>
                    <!--<img src="/assets/images/default.png" alt="user" id="avatar">-->
                </div>
            </div>
        </div>

        {if $smarty.session.type == (0)}
            {include file="personal_page/student.tpl"}
        {else}
            {include file="personal_page/pilote.tpl"}
        {/if}
    </div>
</main>

{include file="helpers/footer.tpl"}